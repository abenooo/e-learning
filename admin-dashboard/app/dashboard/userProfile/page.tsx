"use client";

import { useEffect, useState } from "react";
import { BadgeCheck, BookOpenCheck, Mail, MapPin, Phone, Flag, Landmark, LocateIcon, MoveRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

export default function UserProfile() {
  const [user, setUser] = useState({
    name: "Shimelis Techane",
    email: "shimetechane@gmail.com",
    id: "32382",
    phone: "+251910750228",
    city: "N/A",
    state: "1000",
    zip: "1000",
    country: "Ethiopia",
  });

  const [courses, setCourses] = useState([
    {
      title: "Fullstack Web Application Development",
      duration: "6 Months",
      type: "Paid",
      selected: true,
      logo: "/fullstack.png",
    },
    {
      title: "MuleSoft Development",
      duration: "3 Months",
      type: "Free",
      selected: false,
      logo: "/mulesoft.png",
    },
  ]);

  const [groups, setGroups] = useState([
    { date: "Dec 5th - 2024", name: "Group 1", confirmed: true },
    { date: "Feb 22nd - 2021", name: "", confirmed: false },
  ]);

  const [accessPhases, setAccessPhases] = useState([true, true, true, true, true]);
  const [certificate, setCertificate] = useState({ issue: false, revoke: false });

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold">User Details <span className="text-sm text-muted-foreground ml-2">Discover User Profiles and Course Enrollments.</span></h2>

      {/* === Profile Card === */}
      <div className="bg-white-50 p-4 rounded-md flex flex-col md:flex-row justify-between items-start md:items-center border">
        <div className="flex items-center space-x-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src="/user.jpg" alt="User" />
            <AvatarFallback className="bg-blue-200 text-blue-600">ST</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <p className="text-sm font-medium">{user.id}</p>
          </div>
        </div>
        <div className="text-sm space-y-1 text-muted-foreground mt-4 md:mt-0">
          <div className="flex items-center gap-2"><Phone size={16} className="text-green-500" /> <b>Phone:</b> {user.phone}</div>
          <div className="flex items-center gap-2"><Landmark size={16} className="text-green-500" /> <b>City/State:</b> {user.state}, {user.city}</div>
          <div className="flex items-center gap-2"><LocateIcon size={16} className="text-green-500" /> <b>Zip:</b> {user.zip}</div>
          <div className="flex items-center gap-2"><Flag size={16} className="text-green-500" /> <b>Country:</b> {user.country}</div>
        </div>
      </div>

      {/* === Enrolled Courses === */}
      <div>
        <h3 className="text-base font-semibold mb-2">Enrolled Courses</h3>
        {courses.map((course, i) => (
          <div key={i} className="border rounded-md p-4 mb-3 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img src={course.logo} alt={course.title} className="h-12 w-12" />
              <div>
                <h4 className="font-semibold text-md">{course.title}</h4>
                <div className="flex items-center space-x-2 text-xs mt-1">
                  <span className="bg-muted px-2 py-1 rounded">{course.duration}</span>
                  <span className="bg-purple-200 text-purple-800 px-2 py-1 rounded">{course.type}</span>
                </div>
              </div>
            </div>
            {course.selected ? (
              <Button className="bg-green-400 hover:bg-orange-500 text-white">Selected</Button>
            ) : (
              <Button variant="outline">View Details</Button>
            )}
          </div>
        ))}
      </div>

      {/* === Batch & Group === */}
      <div>
        <h3 className="text-base font-semibold mb-2">Batch & Group Joined</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groups.map((group, i) => (
            <div
              key={i}
              className={
                group.confirmed
                  ? "bg-white-50 p-4 rounded-md border border-black-300"
                  : "bg-gray-100 p-4 rounded-md"
              }
            >
              <div className="flex items-start gap-2">
                <BookOpenCheck className="text-green-500 mt-1" />
                <div>
                  <p className="text-sm font-medium">{group.date} Batch</p>
                  {group.name && <p className="text-xs text-muted-foreground">{group.name}</p>}
                  {!group.confirmed && <span className="text-xs bg-muted px-2 py-1 rounded">Unconfirmed Group</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

 {/* === Access to Phases & Certificate === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-md p-4">
          <h4 className="text-sm font-semibold mb-2">Access To Phase</h4>
          {accessPhases.map((phase, idx) => (
            <div key={idx} className="flex items-center justify-between py-1">
              <span>Phase {idx + 1} :</span>
              <Switch
                checked={phase}
                onCheckedChange={(checked) => {
                  const updated = [...accessPhases];
                  updated[idx] = checked;
                  setAccessPhases(updated);
                }}
                className="data-[state=checked]:bg-green-500"
              />
            </div>
          ))}
        </div>
        <div className="border rounded-md p-4">
          <h4 className="text-sm font-semibold mb-2">Certificate</h4>
          <div className="flex items-center justify-between py-1">
            <span>Issue Certificate</span>
            <Switch
              checked={certificate.issue}
              onCheckedChange={(checked) =>
                setCertificate((prev) => ({ ...prev, issue: checked }))
              }
              className="data-[state=checked]:bg-green-500"
            />
          </div>
          <div className="flex items-center justify-between py-1">
            <span>Revoke Certificate</span>
            <Switch
              checked={certificate.revoke}
              onCheckedChange={(checked) =>
                setCertificate((prev) => ({ ...prev, revoke: checked }))
              }
              className="data-[state=checked]:bg-green-500"
            />
          </div>
        </div>
      </div>

      {/* === Change Group & Batch === */}
      <div className="mt-6">
        <h4 className="text-sm font-semibold mb-2">Change Group & Batch</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-xs mb-1">Associated Batch</label>
            <Select defaultValue="Mar-2025">
              <SelectTrigger><SelectValue placeholder="Select Batch" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Mar-2025">Mar-2025</SelectItem>
                <SelectItem value="Feb-2024">Feb-2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-xs mb-1">Change Group</label>
            <Select defaultValue="Group 1">
              <SelectTrigger><SelectValue placeholder="Select Group" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Group 1">Group 1</SelectItem>
                <SelectItem value="Group 2">Group 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="bg-green-400 hover:bg-orange-500 text-white">Change Group</Button>
        </div>
      </div>
    </div>
  );
}
