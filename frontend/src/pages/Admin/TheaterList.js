import { Table, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { GetAllTheaters, UpdateTheater } from '../../apicalls/theaters';

function TheatresList() {
    const [theaters, setTheatres] = useState([]);


    const getData = async() => {
        try {
            const response = await GetAllTheaters()

            if(response.data.success) {
                message.success("Theatres fetched!")
                setTheatres(response.data.theaters)
            } else {
                console.log(response.data.message)
                message.error("Something went wrong")
            }
        } catch (error) {
            console.log(error)
            message.error("Something went wrong")
        }
    }

    // This will take a theatre object as argument, 
    // Swap the isActive field, and simply call UpdateTheatre
    const handleStatusChange = async(theatre) => {
        try {
            const response = await UpdateTheater({
                theatreId: theatre._id,
                ...theatre,
                isActive: !theatre.isActive
            })
    
            if(response.data.success) {
                if(theatre.isActive) {
                    message.success("Theatre blocked successfully!")
                } else {
                    message.success("Theatre approved successfully!")
                }
                getData()
            } else {
                message.error("Something went wrong")
                console.log(response.data.message)
            }
        } catch (error) {
            message.error("Something went wrong")
            console.log(MediaError) 
        }
        
    }

    useEffect(() => {
        getData()
    }, [])

    const columns = [
        {
          title: "Name",
          dataIndex: "name",
        },
        {
          title: "Address",
          dataIndex: "address",
        },
        {
          title: "Phone",
          dataIndex: "phone",
        },
        {
          title: "Email",
          dataIndex: "email",
        },
        {
          title: "Owner",
          dataIndex: "owner",
          render: (text, record) => {
            return record.owner.name;
          },
        },
        {
          title: "Status",
          dataIndex: "isActive",
          render: (text, record) => {
            if (text) {
              return "Approved";
            } else {
              return "Pending / Blocked";
            }
          },
        },
        {
          title: "Action",
          dataIndex: "action",
          render: (text, record) => {
            return (
              <div className="flex gap-1">
                {record.isActive && (
                  <span
                    className="underline"
                     onClick={() => handleStatusChange(record)}
                  >
                    Block
                  </span>
                )}
                {!record.isActive && (
                  <span
                    className="underline"
                    onClick={() => handleStatusChange(record)}
                  >
                    Approve
                  </span>
                )}
              </div>
            );
          },
        },
      ];

      
    return (
        <div>
          <Table columns={columns} dataSource={theaters}  />
        </div>
      );
}

export default TheatresList
