/* eslint-disable @next/next/no-img-element */
"use client";

import Loading from "@/loading";
import { getToken, removeToken } from "@/utils/token";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      const token = await getToken();
      const res = await fetch("https://dummyjson.com/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      // for (let index = 0; index < 200000; index++) {
      //   console.log(index);
      // }
      setUser(data);
    } catch (error) {
      console.error(error);
      const message = (error as Error).message;
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await removeToken();
    redirect("/login/dummyjson");
  };

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid place-items-center min-h-screen">
      <div className="max-w-4xl mx-auto p-6 bg-white font-sans">
        <div className="flex items-center space-x-6">
          <img
            src={`${user?.image}`}
            alt={`${user?.firstName} ${user?.lastName}`}
            className="w-32 h-32 rounded-full shadow-md"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {user?.firstName} {user?.lastName}{" "}
              <span className="text-sm text-gray-500">(@{user?.username})</span>
              <button
                type="button"
                className="ml-2 text-sm text-red-500 cursor-pointer"
                onClick={logout}
              >
                Logout
              </button>
            </h2>
            <p className="text-sm text-gray-500">
              {user?.company?.title}, {user?.company?.name}
            </p>
            <p className="text-sm text-blue-600">{user?.role}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
          <div>
            <h3 className="text-lg font-semibold mb-2">Personal Info</h3>
            <p>
              <strong>Age:</strong> {user?.age}
            </p>
            <p>
              <strong>Gender:</strong> {user?.gender}
            </p>
            <p>
              <strong>Blood Group:</strong> {user?.bloodGroup}
            </p>
            <p>
              <strong>Eye Color:</strong> {user?.eyeColor}
            </p>
            <p>
              <strong>Hair:</strong> {user?.hair.color}, {user?.hair.type}
            </p>
            <p>
              <strong>Birth Date:</strong> {user?.birthDate}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Phone:</strong> {user?.phone}
            </p>
            <p>
              <strong>IP:</strong> {user?.ip}
            </p>
            <p>
              <strong>MAC:</strong> {user?.macAddress}
            </p>
            <p>
              <strong>User Agent:</strong>
            </p>
            <p className="text-xs text-gray-500">{user?.userAgent}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Address</h3>
            <p>
              <strong>Home:</strong> {user?.address.address},{" "}
              {user?.address.city}, {user?.address.state}{" "}
              {user?.address.postalCode}, {user?.address.country}
            </p>
            <p>
              <strong>Coordinates:</strong> {user?.address.coordinates.lat},{" "}
              {user?.address.coordinates.lng}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Company</h3>
            <p>
              <strong>Department:</strong> {user?.company.department}
            </p>
            <p>
              <strong>Address:</strong> {user?.company.address.address},{" "}
              {user?.company.address.city}
            </p>
            <p>
              <strong>Coordinates:</strong>{" "}
              {user?.company.address.coordinates.lat},{" "}
              {user?.company.address.coordinates.lng}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Bank Info</h3>
            <p>
              <strong>Card:</strong> {user?.bank.cardNumber}
            </p>
            <p>
              <strong>Expire:</strong> {user?.bank.cardExpire}
            </p>
            <p>
              <strong>Type:</strong> {user?.bank.cardType}
            </p>
            <p>
              <strong>Currency:</strong> {user?.bank.currency}
            </p>
            <p>
              <strong>IBAN:</strong> {user?.bank.iban}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Crypto Wallet</h3>
            <p>
              <strong>Coin:</strong> {user?.crypto.coin}
            </p>
            <p>
              <strong>Wallet:</strong>
            </p>
            <p className="break-all text-xs text-gray-600">
              {user?.crypto.wallet}
            </p>
            <p>
              <strong>Network:</strong> {user?.crypto.network}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: Crypto;
  role: string;
}

interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: Coordinates;
  country: string;
}

interface Coordinates {
  lat: number;
  lng: number;
}

interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

interface Company {
  department: string;
  name: string;
  title: string;
  address: Address;
}

interface Crypto {
  coin: string;
  wallet: string;
  network: string;
}

interface Hair {
  color: string;
  type: string;
}

export default Page;
