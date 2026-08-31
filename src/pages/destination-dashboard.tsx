import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Loader2, Plane, Trash2, X } from 'lucide-react';

// --- API FUNCTIONS ---
const fetchDestinations = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=8');
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};

const addDestinationApi = async (newDest: { title: string; body: string }) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({ ...newDest, userId: 1 }),
    headers: { 'Content-Type': 'application/json' },
  });
  return res.json();
};

export const DestinationDashboard = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // 1. Fetch the whole list
  const { data: destinations, isLoading } = useQuery({
    queryKey: ['destinations'],
    queryFn: fetchDestinations,
    staleTime: 1000 * 60,
  });

  // 2. Fetch details for ONE destination
  const { data: details, isLoading: isLoadingDetails } = useQuery({
    queryKey: ['destinations', selectedId],
    queryFn: async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${selectedId}`);
      return res.json();
    },
    enabled: selectedId !== null, // Only run if we have an ID
  });

  // 3. Mutation to Add
  const addMutation = useMutation({
    onSuccess: (newlyCreatedItem) => {
    // 1. Get the current list from the cache
    const oldData = queryClient.getQueryData(['clients']);

    // 2. Manually push the new item into the cache
    if (oldData) {
      queryClient.setQueryData(['clients'], (old: any) => [newlyCreatedItem, ...old]);
    }

    alert('Client added to UI!');
    setTitle('');
  }
  });

  // 4. Mutation to Delete
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      // If we deleted the one we were looking at, close the sidebar
      setSelectedId(null); 
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    addMutation.mutate({ title, body: 'New adventure' });
  };

  return (
    <div className="pt-24 px-8 max-w-4xl mx-auto pb-20">
      <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
        <Plane className="text-blue-600" /> Wanderlust Dashboard
      </h1>
      
      {/* FORM */}
      <form onSubmit={handleSubmit} className="flex gap-4 my-10 bg-white p-4 rounded-2xl border shadow-sm">
        <input 
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new dream destination..."
          className="flex-1 px-4 outline-none"
        />
        <button 
          type="submit"
          disabled={addMutation.isPending}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold disabled:opacity-50"
        >
          {addMutation.isPending ? <Loader2 className="animate-spin" /> : 'Add'}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT: LIST */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Destinations</h2>
          {isLoading ? (
            <Loader2 className="animate-spin text-blue-600" />
          ) : (
            destinations?.map((dest: any) => (
              <div 
                key={dest.id} 
                className={`p-4 border rounded-xl flex justify-between items-center transition-all ${
                  selectedId === dest.id ? 'border-blue-500 bg-blue-50' : 'bg-gray-50'
                }`}
              >
                <button 
                  onClick={() => setSelectedId(dest.id)}
                  className="font-medium capitalize hover:text-blue-600 text-left flex-1"
                >
                  {dest.title}
                </button>
                
                <button 
                  onClick={() => deleteMutation.mutate(dest.id)}
                  className="text-gray-400 hover:text-red-500 p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* RIGHT: DETAILS SIDEBAR */}
        <div className="relative">
          <h2 className="text-xl font-bold mb-4">Preview</h2>
          {selectedId ? (
            <div className="p-6 bg-blue-600 text-white rounded-3xl shadow-xl sticky top-24">
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 hover:rotate-90 transition-transform"
              >
                <X className="w-6 h-6" />
              </button>

              {isLoadingDetails ? (
                <div className="flex items-center gap-2 italic">
                  <Loader2 className="animate-spin w-4 h-4" /> Loading details...
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold mb-4 capitalize">{details?.title}</h3>
                  <p className="opacity-90 leading-relaxed">{details?.body}</p>
                  <div className="mt-6 pt-6 border-t border-white/20 text-sm italic">
                    ID: {details?.id} • User: {details?.userId}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="h-40 border-2 border-dashed rounded-3xl flex items-center justify-center text-muted-foreground">
              Select a destination to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};