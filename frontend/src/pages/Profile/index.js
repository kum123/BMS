
import React from 'react';
import { Tabs } from "antd";
import Bookings from "./Bookings";
import TheaterList from "./TheaterList";
import PageTitle from "../../components/PageTitle";



const Profile = () => {
    return (<div>
            <PageTitle title="Profile" />
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Bookings" key="1">
                    <Bookings />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Apply for Theater" key="2">
                    <TheaterList />
                </Tabs.TabPane>
            </Tabs>
    </div>)
}

export default Profile;