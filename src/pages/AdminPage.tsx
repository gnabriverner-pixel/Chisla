import React, { useEffect, useState } from "react";
import { collection, query, getDocs, orderBy, doc, updateDoc, addDoc, where } from "firebase/firestore";
import { db, auth } from "../lib/firebase";
import { useAuthState } from "../hooks/useAuthState";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { format } from "date-fns";

export function AdminPage() {
  const { profile, loading } = useAuthState();
  const [reports, setReports] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [noteText, setNoteText] = useState("");
  const [activeNoteReportId, setActiveNoteReportId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, any[]>>({});

  useEffect(() => {
    async function fetchData() {
      if (profile?.role !== 'admin') return;
      try {
        const reportsQ = query(collection(db, "reports"), orderBy("createdAt", "desc"));
        const reportsSnap = await getDocs(reportsQ);
        setReports(reportsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const usersQ = query(collection(db, "users"), orderBy("createdAt", "desc"));
        const usersSnap = await getDocs(usersQ);
        setUsers(usersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        
        const notesQ = query(collection(db, "admin_notes"), orderBy("createdAt", "asc"));
        const notesSnap = await getDocs(notesQ);
        const notesMap: Record<string, any[]> = {};
        notesSnap.docs.forEach(doc => {
          const data = doc.data();
          if (data.reportId) {
            if (!notesMap[data.reportId]) notesMap[data.reportId] = [];
            notesMap[data.reportId].push({ id: doc.id, ...data });
          }
        });
        setNotes(notesMap);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setFetching(false);
      }
    }
    if (!loading) {
      fetchData();
    }
  }, [profile, loading]);

  const handleUpgradeReport = async (reportId: string, userId: string | null) => {
    // We shouldn't use confirm in iframe, but for admin panel it might be okay if opened in new tab.
    // Let's replace it with a direct action or custom modal if needed. For now, we'll keep it simple but avoid confirm if possible.
    try {
      await updateDoc(doc(db, "reports", reportId), {
        premiumUnlocked: true,
        updatedAt: new Date().toISOString()
      });
      
      if (userId) {
        await addDoc(collection(db, "premium_access"), {
          userId,
          reportId,
          grantedAt: new Date().toISOString(),
          grantedBy: auth.currentUser?.uid,
          source: "admin_manual"
        });
      }

      setReports(reports.map(r => r.id === reportId ? { ...r, premiumUnlocked: true } : r));
    } catch (error) {
      console.error("Error updating report:", error);
    }
  };

  const handleAddNote = async (reportId: string, userId: string | null) => {
    if (!noteText.trim()) return;
    try {
      const newNote = {
        reportId,
        userId,
        authorAdminId: auth.currentUser?.uid,
        text: noteText,
        createdAt: new Date().toISOString()
      };
      const docRef = await addDoc(collection(db, "admin_notes"), newNote);
      
      setNotes(prev => ({
        ...prev,
        [reportId]: [...(prev[reportId] || []), { id: docRef.id, ...newNote }]
      }));
      setNoteText("");
      setActiveNoteReportId(null);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  if (loading || fetching) return <div className="flex-1 flex items-center justify-center">Загрузка...</div>;
  if (profile?.role !== 'admin') return <div className="flex-1 flex items-center justify-center text-red-400">Доступ запрещен</div>;

  const filteredReports = reports.filter(r => 
    r.inputData?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.inputData?.dateOfBirth?.includes(searchTerm)
  );

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif text-gold-400 mb-8">Панель администратора</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-dark-800/60 border-dark-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl text-gray-200">Все отчеты ({reports.length})</CardTitle>
              <Input 
                placeholder="Поиск по имени или дате..." 
                className="w-64 h-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-400">
                  <thead className="text-xs text-gray-300 uppercase bg-dark-700/50">
                    <tr>
                      <th className="px-4 py-3">Дата создания</th>
                      <th className="px-4 py-3">Имя / Дата рожд.</th>
                      <th className="px-4 py-3">Статус</th>
                      <th className="px-4 py-3">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReports.map(report => (
                      <React.Fragment key={report.id}>
                        <tr className="border-b border-dark-700 hover:bg-dark-700/20">
                          <td className="px-4 py-3">
                            {format(new Date(report.createdAt), "dd.MM.yyyy HH:mm")}
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-medium text-gray-200">{report.inputData?.name || "Аноним"}</div>
                            <div className="text-xs">{report.inputData?.dateOfBirth}</div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${report.premiumUnlocked ? 'bg-gold-500/20 text-gold-400' : 'bg-dark-700 text-gray-300'}`}>
                              {report.premiumUnlocked ? 'Premium' : 'Free'}
                            </span>
                          </td>
                          <td className="px-4 py-3 space-x-2">
                            {!report.premiumUnlocked && (
                              <Button variant="outline" size="sm" onClick={() => handleUpgradeReport(report.id, report.userId)}>
                                Premium
                              </Button>
                            )}
                            <Button variant="outline" size="sm" onClick={() => setActiveNoteReportId(activeNoteReportId === report.id ? null : report.id)}>
                              Заметки ({notes[report.id]?.length || 0})
                            </Button>
                          </td>
                        </tr>
                        {activeNoteReportId === report.id && (
                          <tr className="bg-dark-800/40">
                            <td colSpan={4} className="px-4 py-4">
                              <div className="space-y-4">
                                {notes[report.id]?.map(note => (
                                  <div key={note.id} className="bg-dark-900/50 p-3 rounded text-sm border border-dark-700">
                                    <div className="text-xs text-gray-500 mb-1">{format(new Date(note.createdAt), "dd.MM.yyyy HH:mm")}</div>
                                    <div className="text-gray-300">{note.text}</div>
                                  </div>
                                ))}
                                <div className="flex gap-2">
                                  <Input 
                                    placeholder="Новая заметка..." 
                                    value={noteText}
                                    onChange={(e) => setNoteText(e.target.value)}
                                    className="flex-1"
                                  />
                                  <Button variant="gold" onClick={() => handleAddNote(report.id, report.userId)}>
                                    Добавить
                                  </Button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-dark-800/60 border-dark-700">
            <CardHeader>
              <CardTitle className="text-xl text-gray-200">Пользователи ({users.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.slice(0, 10).map(u => (
                  <div key={u.id} className="flex justify-between items-center border-b border-dark-700 pb-2 last:border-0">
                    <div>
                      <div className="text-sm font-medium text-gray-200">{u.displayName || "Без имени"}</div>
                      <div className="text-xs text-gray-500">{u.email}</div>
                    </div>
                    <span className="text-xs bg-dark-700 px-2 py-1 rounded text-gray-300">{u.role}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
