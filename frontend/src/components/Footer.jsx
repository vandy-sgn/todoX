import React from "react";

const Footer = ({ completedTasksCount, activeTasksCount}) => {
  return (
    <>
      {completedTasksCount + activeTasksCount > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {completedTasksCount > 0 && (
              <>
                Chúc mừng bạn đã hoàn thành {completedTasksCount} công việc
                {activeTasksCount > 0 &&
                  `, còn ${activeTasksCount} công việc nữa thôi. Cố lên 🥳 🎊`}
              </>
            )}

            {completedTasksCount === 0 && activeTasksCount > 0 && (
              <>Bạn đang có {activeTasksCount} nhiệm vụ. Làm ngay nào 👏</>
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default Footer;
