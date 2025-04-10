import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { deletePropertyAPI } from "@/services/propertyService";
import Cookies from "js-cookie";
interface IProps {
  id: string;
  deleteProperty: boolean;
  close: () => void;
}
const uid = Cookies.get("user_id") || "";
function DeleteModal({ id, deleteProperty, close }: IProps) {
  const handleDeleteProperty = async () => {
    try {
      const response = await deletePropertyAPI({ uid, prop_id: id });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Modal
      isOpen={deleteProperty}
      close={close}
      title="Delete property"
      className="text-center font-bold text-2xl pt-6"
    >
      <div className="p-6">
        <h3 className="font-medium">
          Are you sure you want to delete this property?
        </h3>
        <div className="flex pt-5 justify-between space-x-3">
          <Button
            className="bg-primary font-medium hover:bg-primary/80 text-white py-2 px-4 rounded-md"
            type="button"
            onClick={close}
          >
            Cancel
          </Button>
          <Button
            className="bg-red-600 font-medium hover:bg-red-600/80 text-white py-2 px-4 rounded-md"
            onClick={handleDeleteProperty}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteModal;
