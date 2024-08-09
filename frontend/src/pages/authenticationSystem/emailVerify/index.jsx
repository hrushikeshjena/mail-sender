import { useState, useEffect, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Index = () => {
    const [validUrl, setValidUrl] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Params:', params);
        const verifyEmailUrl = async () => {
            try {
                const url = `http://localhost:8080/api/users/${params.id}/verify/${params.token}`;
                const { data } = await axios.get(url);
                console.log('Verification success:', data);
                setValidUrl(true);
                setIsModalVisible(true);
            } catch (error) {
                console.log('Verification error:', error);
               
            }
        };
        verifyEmailUrl();
    }, [params]);

    const handleOk = () => {
        setIsModalVisible(false);
        navigate('/login');
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Fragment>
            {validUrl ? (
                isModalVisible && (
                    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
                        <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
                            <p>Email Verified Successfully</p>
                            <div className="mt-4">
                                <button
                                    onClick={handleOk}
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 mt-2"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )
            ) : (
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="text-center">
                        <h1 className="text-6xl font-bold mb-4">404</h1>
                        <p className="text-xl mb-4">Sorry, the page you visited does not exist.</p>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                        >
                            Back Home
                        </button>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default Index;
