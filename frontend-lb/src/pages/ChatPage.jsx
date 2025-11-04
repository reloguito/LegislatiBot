import React, { useState, useEffect } from "react";
import api from "../api";

const ChatPage = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]); // {role: 'user'|'assistant', text}
  const [contexts, setContexts] = useState([]); // list of contexts from backend
  const [selectedContext, setSelectedContext] = useState("");

  useEffect(() => {
      //cargar contexts (documentos/contextos creados por admin)
    api.get("/documents/contexts").then(res => {
      setContexts(res.data.contexts || []);
      if (res.data.contexts?.length) setSelectedContext(res.data.contexts[0].id);
    }).catch(()=>{});
    }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    const userMsg = { role: "user", text: question };
    console.log("User question:", question);
    setMessages(m => [...m, userMsg]);
    setQuestion("");

    try {
    console.log("Selected context:", selectedContext);
     const quest ={ query: question , history_id : null };
     //const payload = { question, contextId: selectedContext };
      
      const { data } = await api.post("/chat/query", quest);
      console.log("Chat response:", data);
      // backend returns { answer, sourceDocs? }
      setMessages(m => [...m, { role: "assistant", text: data.answer }]);
      // optionally save history handled by backend
    } catch (err) {
      setMessages(m => [...m, { role: "assistant", text: "Error: no se pudo consultar el servidor." }]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Chat (Consulta documentos)</h2>

      <div className="mb-4">
        <label className="block text-sm">Contexto / documento (opcional):</label>
        <select value={selectedContext} onChange={e=>setSelectedContext(e.target.value)} className="p-2 border rounded mt-1">
          <option value="">-- Todos los contextos --</option>
          {contexts.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div className="border p-3 rounded h-64 overflow-auto mb-3">
        {messages.map((m, i) => (
          <div key={i} className={`mb-3 ${m.role === "user" ? "text-right" : "text-left"}`}>
            <div className={`inline-block p-2 rounded ${m.role === "user" ? "bg-blue-100" : "bg-gray-100"}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={submit} className="flex gap-2">
        <input value={question} onChange={(e)=>setQuestion(e.target.value)} placeholder="Hacé una pregunta sobre los documentos..." className="flex-1 p-2 border rounded" />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Preguntar</button>
      </form>
    </div>
  );
};

export default ChatPage;
