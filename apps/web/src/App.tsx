import { FormEvent, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createNote, fetchMap } from './lib/api';
import './App.css';

function App() {
  const queryClient = useQueryClient();
  const [topicName, setTopicName] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const mapQuery = useQuery({ queryKey: ['map'], queryFn: fetchMap });

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      setTitle('');
      setContent('');
      queryClient.invalidateQueries({ queryKey: ['map'] });
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!topicName || !content) return;
    mutation.mutate({ topicName, title: title || undefined, content });
  };

  return (
    <div className="container">
      <header>
        <h1>Neuro Notes</h1>
        <p>Erstelle Notizen und sieh die Neuro Map wachsen.</p>
      </header>
      <main className="grid">
        <section className="card">
          <h2>Neue Notiz</h2>
          <form onSubmit={onSubmit} className="form">
            <label>
              Topic Name*
              <input
                type="text"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
                placeholder="z.B. KI"
                required
              />
            </label>
            <label>
              Titel
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Optional"
              />
            </label>
            <label>
              Content*
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Deine Gedanken..."
                required
              />
            </label>
            <button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Speichern...' : 'Speichern'}
            </button>
            {mutation.isError && (
              <p className="error">{(mutation.error as Error).message}</p>
            )}
          </form>
        </section>
        <section className="card">
          <div className="map-header">
            <h2>Neuro Map</h2>
            {mapQuery.isFetching && <span className="pill">Aktualisiere...</span>}
          </div>
          {mapQuery.isLoading && <p>Loading...</p>}
          {mapQuery.error && <p className="error">Fehler beim Laden.</p>}
          <div className="bubble-wrap">
            {mapQuery.data?.nodes.map((node) => (
              <div
                key={node.id}
                className="bubble"
                style={{ width: node.radius * 2, height: node.radius * 2 }}
              >
                <div className="bubble-label">{node.label}</div>
                <div className="bubble-score">Score: {node.score}</div>
              </div>
            ))}
            {mapQuery.data?.nodes.length === 0 && (
              <p className="muted">Noch keine Topics vorhanden.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
