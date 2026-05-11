import Task from '../models/Task.js';

export const getAlltasks = async (req, res) => {
    try {

        const { filter = "week" } = req.query;
        const now = new Date();
        let startDate;

        switch (filter) {
            case 'today':
                startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
                break;

            case 'week':
                const dayOfWeek = now.getDay();
                const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
                startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - daysToSubtract);
                break;

            case 'month':
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                break;

            case 'all':
            default:
                startDate = null;
                break;
        }

        const query = startDate ? { createdAt: { $gte: startDate } } : {}


        //const tasks = await Task.find().sort({ createdAt: 'desc' });
        //Input: [] (1 mảng các bước xử lý dữ liệu), mỗi phần tử là 1 đối tượng, mỗi đối tượng là 1 bước (stage)
        const result = await Task.aggregate([
            { $match: query },
            {

                $facet: {
                    tasks: [{ $sort: { createdAt: -1 } }],
                    activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
                    completeCount: [{ $match: { status: "complete" } }, { $count: "count" }]
                }
            }
        ])

        const tasks = result[0].tasks;
        const activeCount = result[0].activeCount[0]?.count || 0;
        const completeCount = result[0].completeCount[0]?.count || 0;

        res.status(200).json({ tasks, activeCount, completeCount });
    } catch (error) {
        console.error("Gặp lỗi getAllTasks rồi !!!", error);
        res.status(500).json({ message: "Lỗi hệ thống khi Get All task" })
    }

};

export const createTask = async (req, res) => {

    try {
        const { title } = req.body;
        const task = new Task({ title });

        const newTask = await task.save();

        res.status(201).json(newTask);
    }
    catch (error) {

        res.status(500).json({ message: "Lỗi tạo task" })
        console.error("Lỗi tạo Task", error);
    }
};

export const updateTask = async (req, res) => {
    try {
        const { title, status, completedAt, createdAt } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            {
                title,
                status,
                completedAt,
                createdAt
            },
            {
                returnDocument: "after",
                runValidators: true,
                overwriteImmutable: true
            }
        )

        if (!updatedTask) {
            return res.status(401).json({ message: "Task không tồn tại" });
        }

        res.status(200).json({ updatedTask, message: "Update thành công" });

    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống update" });
        console.error("Lỗi update", error);
    }
};

export const deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);

        if (!deletedTask) {
            return res.status(404).json({ message: "Không tồn tại Task" })
        }

        res.status(200).json({ deletedTask, message: "Xóa thành công" });

    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống delete" });
        console.error("Lổi delete", error);
    }
};