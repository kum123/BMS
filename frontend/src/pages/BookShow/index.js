

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { getShowById } from '../../apicalls/shows';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Button, message } from 'antd';
import StripeCheckout from "react-stripe-checkout";
import { BookShowTickets, MakePayment } from '../../apicalls/bookings';
const BookShow = () => {
    const { user } = useSelector((state) => state.users);
    const [show, setShow] = useState(null);
    const [selectedSeats,setSelectedSeats] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const getData = async () => {
        try {
            const showId = params.showId;
            const response = await getShowById(showId);
            if (response.data.success) {
                setShow(response.data.show)
            }
        } catch (error) {
            message.error("Something went wrong")
        }
    }
    useEffect(() => {
        console.log("book show component called")
        getData();
    }, [])
    const getSeats = () => {
        const columns = 12;
        const totalSeats = show.totalSeats;
        const rows = Math.ceil(totalSeats / columns);
        return (<div>
            <p className="m-4">Screen This Side</p>
            <hr />
            <div className='flex gap-1 flex-col p-2 card'>
                <hr />
                {Array.from(Array(rows).keys()).map((seat, index) => {
                    return (<div className='flex gap-1 justify-center'>
                        {
                        Array.from(Array(columns).keys()).map((column, index) => {
                            const seatNumber = seat * columns + column + 1;
                            let seatClass = "seat";
                            if (selectedSeats.includes(seatNumber)) {
                                seatClass = `${seatClass} selected-seat`
                            }
                            if (show.bookedSeats.includes(seatNumber)) {
                                seatClass = `${seatClass} booked-seat`
                            }
                            return (
                                seatNumber <= totalSeats && (
                                    <div className={seatClass} onClick={() => {
                                        if (selectedSeats.includes(seatNumber)) {
                                            setSelectedSeats(selectedSeats.filter((item) => item !== seatNumber))
                                        } else {
                                            setSelectedSeats([...selectedSeats, seatNumber])
                                        }
                                    }}>
                                        <h1 className="text-sm">{seatNumber}</h1>
                                    </div>
                                )
                            )
                            })
                        }
                    </div>)
                })
                }
            </div>
        </div>)
    }
    
    const book = async (transactionId) => {
        try {
          const response = await BookShowTickets({
            show: params.showId,
            seats: selectedSeats,
            transactionId,
            user: user._id,
          });
          console.log({response})
          if (response.data.success) {
            message.success(response.data.message);
            navigate("/profile");
          } else {
            message.error(response.data.message);
          }
        } catch (error) {
          message.error(error.message);
        }
      };
    
      const onToken = async (token) => {
    
        console.log(token)
        try {
          const response = await MakePayment({
            token,
            amount: selectedSeats.length * show.ticketPrice * 100
            });
          if (response.data.success) {
            message.success(response.data.message);
            book(response.data.secret);
          } else {
            message.error(response.data.message);
          }
        } catch (error) {
          message.error(error.message);
        }
      };
    
      useEffect(() => {
        getData();
      }, []);
    
    return (show && (<div>
        {/* show information */}
        <div className="flex justify-between card p-2 items-center">
            <div>
                <h1 className="text-sm">{show.theater.name}</h1>
                <h1 className="text-sm">{show.theater.address}</h1>
            </div>
            <div>
                <h1 className="text-2xl uppercase">
                    {show.movie.title} ({show.movie.language})
                </h1>
            </div>
            <div>
                <h1 className="text-sm">
                    {moment(show.date).format("MMM dd yyyy")} -{""}
                    {moment(show.time, "HH:mm").format("hh:mm A")}
                </h1>
            </div>

        </div>
        {/* seats */}
        <div className="flex justify-center mt-2">{getSeats()}</div>
        {selectedSeats.length > 0 && (
            <div className="mt-2 flex justify-center gap-2 items-center flex-col">
                <div className='flex justify-center'>
                    <div className="flex upper card p-2 gap-3"> 
                    <h1 className="text-sm"><b>Selected Seats</b> : {selectedSeats.join(",")}</h1>
                    <h1 className="text-sum"></h1>
                    <b>Total Price</b>:{ selectedSeats.length * show.ticketPrice + 200}(Added 200 Convenience fee)
                    </div>
                </div>
                <StripeCheckout token={onToken}
                amount={selectedSeats.length * show.ticketPrice + 200}
                stripeKey="pk_test_51OnbqCSAbIwsDWhkRAy9wKgIeoZH4XyfTCb8IJlPbe4ZnXYrLXM2F9DvKWad2dWsvg9LPHr3YQNz7x7HF0dSr0ui00DjmDvFZ4"
                >
                    <Button>
                        Book Show
                    </Button>
                </StripeCheckout>
            </div>
        )}
    </div>
    )
    );
}

export default BookShow
