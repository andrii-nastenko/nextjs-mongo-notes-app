import {Modal} from "antd";

export default function CustomModal({handleOk, handleCancel, title, isVisible}) {
    return (
        <Modal
            title={title}
            visible={isVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={'Yes'}
            cancelText={'No'}
        >
        </Modal>
    )
}