import { useTopics } from '../context/TopicContext';
import { NewTopicModal } from './NewTopicModal';

export function GlobalModals() {
    const { isCreateModalOpen, setIsCreateModalOpen } = useTopics();

    return (
        <NewTopicModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
        />
    );
}
