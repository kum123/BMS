import { Col, Form, Modal, Row, Table, Button, message } from 'antd';
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { AddShow, DeleteShow, GetShowsByTheaterId } from '../../apicalls/shows';
import { getAllMovies } from '../../apicalls/movies';


const Shows = ({openShowsModal,setOpenShowsModal,theater}) =>{

        const [view,setView] = useState("list");
        const [shows,setShows] = useState([]);
        const [movies,setMovies] = useState([]);

    const getData = async() =>{
        try {
                const response = await GetShowsByTheaterId(theater._id);
                const movieData= await getAllMovies();
                if(movieData.data.success){
                    setMovies(movieData.data.movies);
                }else{
                    message.error("Unable to get movie list");
                }
                if(response.data.success){
                    setShows(response.data.shows);
                    setView("list");

                }else{
                    message.error("Unable to get show list");
                }
        } catch (error) {
            
        }
    }
    const handleAddShow = async (values) => {
        try {
            const response = await AddShow({
                ...values,
                theater: theater._id
            })

            if (response.data.success) {
                 getData();
                } else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error(error);
        }
    }

    const handleDelete = async(id) => {
        try {
            const response = await DeleteShow({
                showId: id
            })

            if (response.data.success) {
                message.success(response.data.message);
                getData();
              } else {
                message.error(response.message);
              }
        } catch (error) {
            message.error(error);
        }
    }


    useEffect(() =>{
        getData();
    },[])
const columns =[
    {title:"Show Name",dataIndex:"name"},
    {title:"Date",dataIndex:"date", render: (text, record) => {
        return moment(text).format("MMM Do YYYY");
       }
},
    {title:"Time",dataIndex:"time"},
    {title:"Movie",dataIndex:"movie",render:(text,record)=>{ return record.movie.title}},
    {title:"Ticket Price",dataIndex:"ticketPrice"},
    {title:"Total Seats",dataIndex:"totalSeats"},
    {title:"Available Seats",dataIndex:"availableSeats",render:(text,record)=>{ return record.totalSeats - record.bookedSeats.length}},
    {title:"Action",dataIndex:"action",render:(text,record)=>{  
        return (<div className="flex gap-1 items-center">
                            {record.bookedSeats.length === 0 && 
                            (<i className="ri-delete-bin-line" onClick={() => {handleDelete(record._id); }}>
                              </i>
                              )}
                              </div>
                              );
                            },
                         }
]
    return (
        <Modal title="" open={openShowsModal} 
        onCancel={()=> setOpenShowsModal(false)}
        width={1400} footer={null}>
                <h1 className="text-primary text-md uppercase nb-1"> Theater : {theater.name}</h1>
                <hr/>
                <div className="flex justify-between mt-1 mb-1 items-center">
                    <h1 className="text-md uppercase">
                        {view == "table" ? "Shows" : "Add show"}
                    </h1>
                    {(
                        <Button variant="outlined"
                            onClick={()=>{ setView("form")}}>
                            AddShow
                        </Button>
                    )}
                </div>
                {view === 'list' && <Table columns={columns} dataSource={shows}/>}
                {view === "form" && (
                <Form layout="vertical" onFinish={handleAddShow}>
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <Form.Item
                                label="Show Name"
                                name="name"
                                rules={[{ required: true, message: "Please input show name!" }]}
                            >
                                <input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Date"
                                name="date"
                                rules={[{ required: true, message: "Please input show date!" }]}
                            >
                                <input
                                    type="date"
                                    min={new Date()}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label="Time"
                                name="time"
                                rules={[{ required: true, message: "Please input show time!" }]}
                            >
                                <input type="time" />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label="Movie"
                                name="movie"
                                rules={[{ required: true, message: "Please select movie!" }]}
                            >
                                <select>
                                    <option value="">Select Movie</option>
                                    {movies.map((movie) => (
                    <option key={movie._id} value={movie._id}>{movie.title}</option>
                  ))}
                                </select>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label="Ticket Price"
                                name="ticketPrice"
                                rules={[
                                    { required: true, message: "Please input ticket price!" },
                                ]}
                            >
                                <input type="number" />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label="Total Seats"
                                name="totalSeats"
                                rules={[
                                    { required: true, message: "Please input total seats!" },
                                ]}
                            >
                                <input type="number" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <div className="flex justify-end gap-1">
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setView("list");
                            }}
                        >Cancel</Button>
                        <Button variant="contained" htmlType="submit">
                            SAVE
                        </Button>
                    </div>
                </Form>
            )}

        </Modal>
    )
}

export default Shows