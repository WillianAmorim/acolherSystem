import React from "react";
import { useFetchUser } from "../hooks/useFetchUser";
import UserInfo from "../components/UserInfo";
import ChangePasswordForm from "../components/ChangePasswordForm";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer } from "react-toastify";

const Profile: React.FC = () => {
    const { usuario } = useFetchUser();

    return (
        <div className="p-8 bg-white min-h-screen">
            {usuario ? (
                <>
                    <UserInfo usuario={usuario} />
                    <ChangePasswordForm usuario={usuario} />
                </>
            ) : (
                <div className="flex justify-center items-center h-screen bg-white">
                    <ClipLoader color="#3B7B7B" size={60} />
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default Profile;
