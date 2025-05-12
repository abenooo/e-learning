"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calculator,
  Trash,
  BarChart3,
} from "lucide-react";

type IndividualScore = {
  group: string;
  total: number;
  steps: number[];
  weeklyScore: number | null;
};

type GroupScore = {
  group: string;
  course: string;
  batch: string;
  scores: number[];
  average: number | null;
};

const COURSES = ["fullstack", "mulesoft", "aws", "database"];
const BATCHES = ["april-2025", "may-2025"];
const GROUPS = ["GS-1", "GS-2"];
const PHASES = ["phase 1", "phase 2", "phase 3"];
const WEEKS = ["week 1: introduction", "week 2: CSS", "week 3: HTML"];

export default function WeeklyReportPage() {
  const [formData, setFormData] = useState({
    course: "",
    batch: "",
    group: "",
    phase: "",
    week: "",
  });

  const [individualScores, setIndividualScores] = useState<IndividualScore[]>([]);
  const [groupScores, setGroupScores] = useState<GroupScore[]>([]);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const updated = { ...formData, [e.target.name]: e.target.value };
    setFormData(updated);
  };

  useEffect(() => {
    const { course, batch, group, phase, week } = formData;
    if (course && batch && group && phase && week) {
      // Create a new student row
      const newScore: IndividualScore = {
        group,
        total: 14,
        steps: [0, 0, 0, 0, 0],
        weeklyScore: null,
      };
      setIndividualScores([newScore]);

      // Ensure matching group in groupScores
      const exists = groupScores.find((g) => g.group === group);
      if (!exists) {
        const newGroupScore: GroupScore = {
          group,
          course,
          batch,
          scores: [0, 0, 0, 0, 0],
          average: null,
        };
        setGroupScores((prev) => [...prev, newGroupScore]);
      }
    } else {
      setIndividualScores([]);
    }
  }, [formData]);

  const calculateColumn = (stepIndex: number) => {
    const updatedIndividuals = individualScores.map((student) => {
      const newValue = Math.floor(Math.random() * 100);
      student.steps[stepIndex] = newValue;
      return student;
    });
    setIndividualScores([...updatedIndividuals]);
    updateGroupScoresFromIndividuals(updatedIndividuals);
  };

  const deleteColumn = (stepIndex: number) => {
    const updatedIndividuals = individualScores.map((student) => {
      student.steps[stepIndex] = 0;
      return student;
    });
    setIndividualScores([...updatedIndividuals]);
    updateGroupScoresFromIndividuals(updatedIndividuals);
  };

  const calculateWeeklyScore = () => {
    const updatedIndividuals = individualScores.map((student) => {
      const totalScore = student.steps.reduce((a, b) => a + b, 0) / 5;
      student.weeklyScore = Math.round(totalScore);
      return student;
    });
    setIndividualScores([...updatedIndividuals]);
    updateGroupScoresFromIndividuals(updatedIndividuals);
  };

  const deleteWeeklyScore = () => {
    const updatedIndividuals = individualScores.map((student) => {
      student.weeklyScore = null;
      return student;
    });
    setIndividualScores([...updatedIndividuals]);
    updateGroupScoresFromIndividuals(updatedIndividuals);
  };

  const updateGroupScoresFromIndividuals = (individuals: IndividualScore[]) => {
    const newGroupScores: GroupScore[] = [];

    const groupMap: Record<string, IndividualScore[]> = {};
    individuals.forEach((s) => {
      if (!groupMap[s.group]) groupMap[s.group] = [];
      groupMap[s.group].push(s);
    });

    for (const groupName in groupMap) {
      const members = groupMap[groupName];
      const stepsSum = [0, 0, 0, 0, 0];
      const memberCount = members.length;

      members.forEach((s) => {
        s.steps.forEach((score, i) => {
          stepsSum[i] += score;
        });
      });

      const stepAverages = stepsSum.map((total) =>
        memberCount > 0 ? Math.round(total / memberCount) : 0
      );

      const avgWeeklyScore =
        members.reduce((acc, curr) => acc + (curr.weeklyScore ?? 0), 0) /
        memberCount;

      const formGroup = formData.group === groupName;

      newGroupScores.push({
        group: groupName,
        course: formGroup ? formData.course : "",
        batch: formGroup ? formData.batch : "",
        scores: stepAverages,
        average: Math.round(avgWeeklyScore),
      });
    }

    setGroupScores(newGroupScores);
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold text-orange-400 mb-6 flex items-center gap-2">
        <BarChart3 className="text-orange-500" />
        Weekly Report
      </h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 text-sm mb-4">
        {[
          { name: "course", values: COURSES },
          { name: "batch", values: BATCHES },
          { name: "group", values: GROUPS },
          { name: "phase", values: PHASES },
          { name: "week", values: WEEKS },
        ].map(({ name, values }) => (
          <select
            key={name}
            name={name}
            onChange={handleChange}
            className="p-2 bg-slate-800 border border-slate-600 rounded"
          >
            <option value="">Select {name}</option>
            {values.map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        ))}
      </div>

      {/* Group Table */}
      <h2 className="text-lg font-semibold mt-6 mb-2">All Group Scores</h2>
      <table className="w-full text-sm mb-8 border border-slate-700">
        <thead className="bg-slate-800">
          <tr>
            <th>Group</th>
            <th>Videos (25%)</th>
            <th>Class (15%)</th>
            <th>Checklist (10%)</th>
            <th>Exercises (25%)</th>
            <th>Group (25%)</th>
            <th>Weekly Score</th>
          </tr>
        </thead>
        <tbody>
          {groupScores.map((group, idx) => (
            <tr key={idx} className="text-center">
              <td>{group.group}</td>
              {group.scores.map((score, i) => (
                <td key={i}>{score}%</td>
              ))}
              <td>{group.average !== null ? `${group.average}%` : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Individual Table */}
      <h2 className="text-lg font-semibold mb-2">Individual Scores</h2>
      <table className="w-full text-sm border border-slate-700">
        <thead className="bg-slate-800">
          <tr>
            <th>Group</th>
            <th>Total Student</th>
            {["Videos", "Class", "Checklist", "Exercises", "Group"].map(
              (label, i) => (
                <th key={i}>
                  {label} (%):
                  <div className="flex justify-center gap-1 mt-1">
                    <button
                      onClick={() => calculateColumn(i)}
                      className="text-green-500"
                    >
                      <Calculator size={16} />
                    </button>
                    <button
                      onClick={() => deleteColumn(i)}
                      className="text-red-500"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </th>
              )
            )}
            <th>
              Weekly Score
              <div className="flex justify-center gap-1 mt-1">
                <button
                  onClick={calculateWeeklyScore}
                  className="text-green-500"
                >
                  <Calculator size={16} />
                </button>
                <button
                  onClick={deleteWeeklyScore}
                  className="text-red-500"
                >
                  <Trash size={16} />
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {individualScores.map((student, idx) => (
            <tr key={idx} className="text-center">
              <td>{student.group}</td>
              <td>{student.total}</td>
              {student.steps.map((step, i) => (
                <td key={i}>{step}%</td>
              ))}
              <td>
                {student.weeklyScore !== null ? `${student.weeklyScore}%` : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 flex gap-4 justify-center items-center">
        <ChevronLeft className="cursor-pointer text-orange-500" />
        <div className="text-sm text-slate-400">Page 1 of 5</div>
        <ChevronRight className="cursor-pointer text-orange-500" />
      </div>
    </div>
  );
}
