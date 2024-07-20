import React, { useEffect, useState } from 'react';
import { getTotalOrder, getTotalRevenue, getListOrder } from '../../api/apiDashboard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import {
  Card,
  Typography,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faBagShopping
} from "@fortawesome/free-solid-svg-icons";
import HeaderStaff from "./HeaderStaff";
import SidebarStaff from "./SidebarStaff";

const Dashboard = () => {
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [orderData, setOrderData] = useState([]);
  const [startDate, setStartDate] = useState(new Date('1753-01-01'));
  const [endDate, setEndDate] = useState(new Date('2500-12-31'));

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  const fetchData = async () => {
    await fetchTotalOrder();
    await fetchTotalRevenue();
    await fetchListOrder();
  };

  const fetchTotalOrder = async () => {
    try {
      const response = await getTotalOrder(startDate, endDate);
      setTotalOrder(response.data.totalOrder);
    } catch (error) {
      toast.error("Error fetching total order data");
    }
  };

  const fetchTotalRevenue = async () => {
    try {
      const response = await getTotalRevenue(startDate, endDate);
      setTotalRevenue(response.data.totalRevenue);
    } catch (error) {
      toast.error("Error fetching total revenue data");
    }
  };

  const fetchListOrder = async () => {
    try {
      const response = await getListOrder(startDate, endDate);
      setOrderData(response.data.orders.$values.map(order => ({
        date: new Date(order.date).toLocaleDateString(),
        totalPrice: order.totalPrice
      })));
    } catch (error) {
      toast.error("Error fetching list order data");
    }
  };

  const formatPrice = (value) => {
    return new Intl.NumberFormat("en-US", { minimumFractionDigits: 0 }).format(value) + " VND";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-2/12 h-full fixed">
        <SidebarStaff />
      </div>
      <div className="flex flex-col w-10/12 ml-auto">
        <HeaderStaff />
        <main className="flex-1 p-4 mt-16 ml-3">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          <div className="date-picker-container flex space-x-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date: </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date: </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="yyyy-MM-dd"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>
          <div className="summary grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <Card className="shadow-lg p-6 bg-white rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <Typography className="text-xl font-semibold text-gray-900">Total Orders</Typography>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faBagShopping} className="text-orange-500 pr-4 text-2xl" />
                <Typography className="text-2xl font-bold">{totalOrder}</Typography>
              </div>
            </Card>
            <Card className="shadow-lg p-6 bg-white rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <Typography className="text-xl font-semibold text-gray-900">Total Revenue</Typography>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faBagShopping} className="text-orange-500 pr-4 text-2xl" />
                <Typography className="text-2xl font-bold">{formatPrice(totalRevenue)}</Typography>
              </div>
            </Card>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <BarChart
              width={800}
              height={400}
              data={orderData}
              margin={{
                top: 20, right: 30, left: 20, bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalPrice" fill="#8884d8" />
            </BarChart>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
