import React, { createContext, useContext, useState } from 'react';

interface TopicContextType {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
  /** Convenience function to open the new topic modal */
  openNewTopicModal: () => void;
  triggerRefresh: number;
  refreshGraph: () => void;
}

const TopicContext = createContext<TopicContextType | undefined>(undefined);

export function TopicProvider({ children }: { children: React.ReactNode }) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [triggerRefresh, setTriggerRefresh] = useState(0);

  // Function to open the modal (sets state to true)
  const openNewTopicModal = () => setIsCreateModalOpen(true);

  const refreshGraph = () => setTriggerRefresh(prev => prev + 1);

  return (
    <TopicContext.Provider
      value={{
        isCreateModalOpen,
        setIsCreateModalOpen,
        openNewTopicModal,
        triggerRefresh,
        refreshGraph,
      }}
    >
      {children}
    </TopicContext.Provider>
  );
}

export function useTopics() {
  const context = useContext(TopicContext);
  if (context === undefined) {
    throw new Error('useTopics must be used within a TopicProvider');
  }
  return context;
}
