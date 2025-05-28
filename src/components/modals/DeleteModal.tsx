import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";

type DeleteModalProps = {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName?: string;
};

export default function DeleteModal({ show, onClose, onConfirm, itemName }: DeleteModalProps) {
    return (
        <Modal show={show} onClose={onClose}>
            <ModalHeader>
                <div className="flex justify-between items-center w-full">
                    <span>Confirm Delete</span>
                   
                </div>
            </ModalHeader>

            <ModalBody>
                <div className="space-y-4">
                    <p className="text-gray-700">
                        {`Are you sure you want to delete ${itemName ?? 'this item'}?`}
                    </p>
                    <div className="flex justify-end gap-2">
                        <Button color="failure" onClick={onConfirm}>
                            Delete
                        </Button>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
}
