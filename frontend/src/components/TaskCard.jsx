import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  Calendar,
  CheckCircle2,
  Circle,
  SquarePen,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import api from "@/lib/axios";
import { toast } from "sonner";

const TaskCard = ({ task, index, handleTaskChanged }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "");
  const [isDeleting, setIsDeleting] = useState(false);

  const updateTask = async () => {
    try {
      setIsEditing(false);
      await api.put(`/tasks/${task._id}`, {
        title: updateTaskTitle,
      });

      toast.success(`Task đã đổi thành: ${updateTaskTitle}`);
      handleTaskChanged();
    } catch (error) {
      console.error("Gặp lỗi khi sửa task", error);
      toast.error("Lỗi sửa task");
    }
  };

  const deleteTask = async (taskID) => {
    try {
      setIsDeleting(true);
      await api.delete(`/tasks/${taskID}`);
      toast.success("Xóa thành công");
      handleTaskChanged();
    } catch (error) {
      console.error("Gặp lỗi khi xóa task", error);
      toast.error("Lỗi xóa task");
    }

    setIsDeleting(false);
  };

  const toggleTaskCompleteButton = async () => {
    try {
      if (task.status === "active") {
        await api.put(`/tasks/${task._id}`, {
          status: "complete",
          completedAt: new Date().toISOString(),
        });

        toast.success("Hoàn thành task");
        handleTaskChanged();
      } else {
        await api.put(`/tasks/${task._id}`, {
          status: "active",
          completedAt: null,
        });

        toast.success(`${task.title} đã chuyển sang chưa hoàn thành`);
        handleTaskChanged();
      }
    } catch (error) {
      console.error("Có lỗi chuyển trạng thái", error);
      toast.error("Chuyển trạng thái không thành công");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      updateTask();
    }
  };

  return (
    <Card
      className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        task.status === "complete" && "opacity-75",
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className=" flex items-center gap-4">
        {/**Button for displaying active or complete */}
        <div>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "flex-shrink-0 size-8 rounded-full transition-all duration-200",
              task.status === "complete"
                ? "text-success hover:text-success/80"
                : "text-muted-foreground hover:text-primary",
            )}
            onClick={toggleTaskCompleteButton}
          >
            {task.status === "complete" ? (
              <CheckCircle2 className="size-5" />
            ) : (
              <Circle className="size-5" />
            )}
          </Button>
        </div>

        {/**List tasks: title*/}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <Input
              placeholder="Cần phải làm gì?"
              className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
              type="text"
              autoFocus
              value={updateTaskTitle}
              onChange={(event) => setUpdateTaskTitle(event.target.value)}
              onBlur={() => {
                setIsEditing(false);
                setUpdateTaskTitle(task.title || "");
              }}
              onKeyPress={handleKeyPress}
            />
          ) : (
            <p
              className={cn(
                "text-base transition-all duration-200",
                task.status === "complete"
                  ? "line-through text-muted-foreground"
                  : "text-foreground",
              )}
            >
              {task.title}
            </p>
          )}

          {/**date &time */}
          <div className="flex items-center gap-2 mt-1">
            {/**Created At */}
            <Calendar className="size-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {new Date(task.createdAt).toLocaleString()}
            </span>

            {/**Completed At */}
            {task.completedAt && (
              <>
                <span className="text-xs text-muted-foreground"> - </span>
                <Calendar className="size-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {new Date(task.completedAt).toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>

        {/**Button for editing and deleting */}
        <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-color size-8 text-muted-foreground hover:text-info"
            onClick={() => {
              setIsEditing(true);
              setUpdateTaskTitle(task.title || "");
            }}
          >
            <SquarePen className="size-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "flex-shrink-0 transition-color size-8 text-muted-foreground hover:text-destructive",
              isDeleting ? "opacity-50 cursor-not-allowed" : {},
            )}
            disabled={isDeleting}
            onClick={() => {
              deleteTask(task._id);
            }}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
