
import Modal from '../modals/CreateModal.tsx';

interface HabitFormProps {
    show: boolean;
    onClose: () => void;
}

export default function HabitForm({ show, onClose }: HabitFormProps) {

    return (
        <>
            <Modal
                show={show}
                title="Add habit"
                onClose={onClose}>
                <div>this is it</div>
            </Modal>
        </>
    );
}