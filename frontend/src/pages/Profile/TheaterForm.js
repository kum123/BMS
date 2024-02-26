import { Form, message, Modal, Button } from "antd";
import React from 'react'
import { AddTheater, UpdateTheater } from '../../apicalls/theaters';
import { useDispatch, useSelector } from 'react-redux';

const TheaterForm = ({
    showTheaterFormModal,
    setShowTheaterFormModal,
    formType,
    setFormType,
    selectedTheater,
    setSelectedTheater,
    getData
}) => {

    const { user } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const onFinish = async (values)=>{
        values.owner = user._id
        try {
            let response = null;
            if(formType == 'add'){
                response = await AddTheater(values)
            }else{
                values.theaterId = selectedTheater._id;
                response = await UpdateTheater(values);
            }
            if(response.data.success){
                  setShowTheaterFormModal(false);
                  setSelectedTheater(null);
                  getData();
            }else{

            }
        } catch (error) {
            message.error(error)
        }
        
    }
  return ( <Modal title={formType === 'add' ? 'Add Theater' : "Edit Theater"} 
      open={showTheaterFormModal}
      onCancel={()=>{ 
        setShowTheaterFormModal(false);
        setSelectedTheater(null);
        }}
        footer={null}>
        <Form layout="vertical" onFinish={onFinish} initialValues={selectedTheater}>
                <Form.Item label="Name" name="name" rules={[{required:true,message:"Please input theater name!"}]}>
                    <input type="text"/>
                </Form.Item>
                <Form.Item label="Address" name="address" rules={[{required:true,message:"Please input theater address!"}]}>
                    <input type="text"/>
                </Form.Item>
                <Form.Item label="Phone" name="phone" rules={[{required:true,message:"Please input theater phone number!"}]}>
                    <input type="text"/>
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[{required:true,message:"Please input theater email!"}]}>
                    <input type="text"/>
                </Form.Item>
                <div className="flex justify-end gap-1">
                    <Button variant="outlined" htmlType="button"
                    onClick={()=>{
                        setShowTheaterFormModal(false);
                        setSelectedTheater(null);
          
                    }}>Cancel
                    </Button>
                    <Button htmlType="submit">Save</Button>
                </div>
        </Form>
      </Modal>)
}

export default TheaterForm
