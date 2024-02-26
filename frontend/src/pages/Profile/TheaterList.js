import { Button, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'
import TheaterForm from './TheaterForm';
import { getTheatersByUserId } from '../../apicalls/theaters';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Shows from '../Shows/index';
const TheaterList = () => {
    const {user} = useSelector((state) => state.users);
    const [showTheaterFormModal,setShowTheaterFormModal] = useState(false);
    const [formType,setFormType] = useState("add");
    const [theaters,setTheaters] = useState([]);
    const [openShowsModal = false, setOpenShowsModal] = useState(false);
    const [selectedTheater = null, setSelectedTheater] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const getData = async () => {
        try {
            let result = null;
            result = await getTheatersByUserId({userId: user._id});
            if(result.data.success) {
                setTheaters(result.data.theaters)
            }else{
                message.error(result.message);
            }
        } catch (error) {
            message.error(error);
        }
    }
    const handleModal=()=>{
        setFormType("add");
        setShowTheaterFormModal(true);
        console.log(showTheaterFormModal)
       }
    const columns =[
        {title:"Name",dataIndex:"name"},
        {title:"Address",dataIndex:"address"},
        {title:"Phone",dataIndex:"phone"},
        {title:"Email",dataIndex:"email"},
        {title:"Status",
        dataIndex:"isActive",
        render:(text,record)=>{
            if(text){
                return "Approved";
            }else{
                return "Pending/Blocked"
            }
        }
    },
    {title:"Action",dataIndex:"action",
    render:(text,record)=>{
        return (<div className="flex gap-1 items-center">
            <i className="ri-delete-bin-line" onClick={()=>{
                // handleDelete(record._id)
            }}>
           </i>
           <i className="ri-pencil-line" onClick={()=>{
            setFormType("edit");
            setSelectedTheater(record);
            setShowTheaterFormModal(true);
           }}> </i>
           { record.isActive && (<span
                  className="underline"
                  onClick={() => {
                    setSelectedTheater(record);
                    setOpenShowsModal(true);
                  }}
                > Shows
                </span>
  
           )}
        </div>)
        }
    }
    ];
    useEffect(() => {
        getData();
      }, []);
    
  return (
    <div>
      <div className="flex justify-end mb-1">
        <Button variant="outlined"
        onClick={()=>{  
            setFormType("add");
           setShowTheaterFormModal(true);}}>
            Add Theatre
        </Button>
      </div>
    <Table columns={columns} dataSource={theaters} />

    {showTheaterFormModal && (
        <TheaterForm
          showTheaterFormModal={showTheaterFormModal}
          setShowTheaterFormModal={setShowTheaterFormModal}
          formType={formType}
          setFormType={setFormType}
          selectedTheater={selectedTheater}
          setSelectedTheater={setSelectedTheater}
          getData={getData}
        />
      )}



        {openShowsModal && (
            <Shows
            openShowsModal={openShowsModal}
            setOpenShowsModal={setOpenShowsModal}
            theater={selectedTheater}
            />
        )}

    </div>
  )
}



export default TheaterList
