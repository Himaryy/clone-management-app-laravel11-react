import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constant";
import { Link, router } from "@inertiajs/react";
import React from "react";

export default function TaskTable({ tasks, queryParams = null }) {
  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("task.index", queryParams));
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;

    searchFieldChanged(name, e.target.value);
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }

    router.get(route("task.index", queryParams));
  };
  return (
    <>
      <div className="overflow-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-500 dark:text-gray-400 border-b-2 border-gray-500">
            <tr className="text-nowrap">
              <TableHeading
                name="id"
                sortChanged={sortChanged}
                sort_direction={queryParams.sort_direction}
                sort_field={queryParams.sort_field}
              >
                ID
              </TableHeading>
              <th className="px-3 py-3">Image</th>
              <TableHeading
                name="name"
                sortChanged={sortChanged}
                sort_direction={queryParams.sort_direction}
                sort_field={queryParams.sort_field}
              >
                Name
              </TableHeading>
              <TableHeading
                name="status"
                sortChanged={sortChanged}
                sort_direction={queryParams.sort_direction}
                sort_field={queryParams.sort_field}
              >
                Status
              </TableHeading>
              <TableHeading
                name="create_at"
                sortChanged={sortChanged}
                sort_direction={queryParams.sort_direction}
                sort_field={queryParams.sort_field}
              >
                Create Date
              </TableHeading>
              <TableHeading
                name="due_date"
                sortChanged={sortChanged}
                sort_direction={queryParams.sort_direction}
                sort_field={queryParams.sort_field}
              >
                Due Date
              </TableHeading>
              <th className="px-3 py-3">Created By</th>
              <th className="px-3 py-3">Actions</th>
            </tr>
          </thead>

          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-500 dark:text-gray-400 border-b-2 border-gray-500">
            <tr className="text-nowrap">
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3">
                <TextInput
                  className="w-full"
                  defaultValue={queryParams.name}
                  placeholder="Task Name"
                  onBlur={(e) => searchFieldChanged("name", e.target.value)}
                  onKeyPress={(e) => onKeyPress("name", e)}
                />
              </th>
              <th className="px-3 py-3">
                <SelectInput
                  defaultValue={queryParams.status}
                  className="w-full"
                  onChange={(e) => searchFieldChanged("status", e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
              </th>
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3"></th>
            </tr>
          </thead>

          <tbody>
            {tasks.data.map((task) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={task.id}
              >
                <td className="px-3 py-2">{task.id}</td>
                <td className="px-3 py-2">
                  <img
                    src={task.image_path}
                    alt="Image"
                    style={{ width: 60 }}
                  />
                </td>
                <td className="px-3 py-2">{task.name}</td>
                <td className="px-3 py-2">
                  <span
                    className={
                      "px-2 py-1 rounded text-white " +
                      TASK_STATUS_CLASS_MAP[task.status]
                    }
                  >
                    {TASK_STATUS_TEXT_MAP[task.status]}
                  </span>
                </td>
                <td className="px-3 py-2 text-nowrap">{task.created_at}</td>
                <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
                <td className="px-3 py-2">{task.createdBy.name}</td>
                <td className="px-3 py-2">
                  <Link
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                    href={route("task.edit", task.id)}
                  >
                    Edit
                  </Link>

                  <Link
                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                    href={route("task.destroy", task.id)}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination links={tasks.meta.links} />
    </>
  );
}
