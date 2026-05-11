import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StartAndFilters from "@/components/StartAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import api from "@/lib/axios";
import { visibleTasksLimit } from "@/lib/data";
import React, { use, useEffect } from "react";
import { useState } from "react";
import { data } from "react-router";
import { toast } from "sonner";

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [completeCount, setCompleteCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("all");
  const [page, setPage] = useState(1);
  
  useEffect(() => {
    fetchTasks();
  }, [dateQuery]);
  
  useEffect(() => {
    setPage(1);
  }, [filter, dateQuery]);


  //============Call API================
  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks);
      setActiveCount(res.data.activeCount);
      setCompleteCount(res.data.completeCount);
    } catch (error) {
      console.error("Lỗi xảy ra khi truy xuất Task", error);
      toast.error("Lỗi xảy ra khi truy xuất Task");
    }
  };

  //========== Variables =================
  const filteredTask = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "completed":
        return task.status === "complete";

      default:
        return true;
    }
  });

  //Display tasks per page
  const visibleTasks = filteredTask.slice(
    (page - 1) * visibleTasksLimit,
    page * visibleTasksLimit,
  );

  const totalPages = Math.ceil(filteredTask.length / visibleTasksLimit);

  //====== useEffect | camera giam sat =========

  useEffect(() => {
    if (visibleTasks.length === 0 && page > 1) {
      setPage((prev) => prev - 1);
    }
  }, [visibleTasks.length, page]);

  //====== handler ============
  const handleTaskChanged = () => {
    fetchTasks();
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };



  return (
    <div className="min-h-screen w-full bg-[#fefcff] relative">
      {/* Dreamy Sky Pink Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
        }}
      />
      {/* Your content goes here */}
      <div className="container pt-8 mx-auto relative z-10">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          {/** Header */}
          <Header />

          {/** Input */}
          <AddTask handleNewTaskAdded={handleTaskChanged} />

          {/** Start and Filter */}
          <StartAndFilters
            filter={filter}
            setFilter={setFilter}
            handlePageChange={handlePageChange}
            activeTasksCount={activeCount}
            completedTasksCount={completeCount}
          />

          {/** Task list */}
          <TaskList
            filteredTasks={visibleTasks}
            filter={filter}
            handleTaskChanged={handleTaskChanged}
          />

          {/** Pagination & Date time Filter | Phân trang vả bộ lọc*/}

          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />
            <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
          </div>

          {/**Footer */}
          <Footer
            activeTasksCount={activeCount}
            completedTasksCount={completeCount}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
