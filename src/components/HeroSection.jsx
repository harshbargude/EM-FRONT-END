import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddEmployeeForm from "./AddEmpBox";
import EditEmployee from "./EditEmployee";
import { useEffect, useState } from "react";

const Hero = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupE, setShowPopupE] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const handleButtonClick = () => {
        setSelectedEmployee(null);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedEmployee(null);
    };
    const handleClosePopupE = () => {
        setShowPopupE(false);
        setSelectedEmployee(null);
    };
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    // console.log(`${apiUrl}`);
    // var process;
    useEffect(() => {
        
        
        fetch(`${apiUrl}/employees`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Network response was not ok. Status: ${res.status}`);
                }
                return res.json();
            })
            .then((result) => setEmployees(result))
            .catch((error) => {
                console.error("Error fetching employees:", error);
            });
    }, []);

    const handleEditClick = (employee) => {
        setSelectedEmployee(employee);
        setShowPopupE(true);
    };

    const handleDeleteClick = (id) => {
        fetch(`${apiUrl}/employees/${id}`, {
            method: "DELETE",
        })
            .then(() => {
                setEmployees(employees.filter((employee) => employee.id !== id));
            })
            .catch((error) => console.error("Error deleting employee:", error));
    };

    const handleFormSubmit = (updatedEmployee) => {
        const url = selectedEmployee
            ? `${apiUrl}/employees/${updatedEmployee.id}`
            : `${apiUrl}/employees`;

        const method = selectedEmployee ? "PUT" : "POST";

        fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedEmployee),
        })
            .then((res) => res.json())
            .then((responseEmployee) => {
                if (selectedEmployee) {
                    setEmployees((prev) =>
                        prev.map((emp) =>
                            emp.id === responseEmployee.id ? responseEmployee : emp
                        )
                    );
                } else {
                    setEmployees((prev) => [...prev, responseEmployee]);
                }
                handleClosePopup();
                handleClosePopupE();
            })
            .catch((error) => console.error("Error updating/adding employee:", error));
    };

    return (
        <div className="Hero-main">
            <img
                src="./images/main-hero.png"
                alt="main-hero-image"
                style={{ opacity: 0.8 }}
            />
            <div className="main-Parent-Table">
                <h1 className="h1-hero">Employees List</h1>
                <div className="add-button">
                    <button onClick={handleButtonClick}>
                        <FontAwesomeIcon
                            icon={faAdd}
                            style={{ fontWeight: "600", fontSize: "18px" }}
                        />{" "}
                        New Employee
                    </button>
                    {showPopup && (
                        <AddEmployeeForm
                            employee={selectedEmployee}
                            onClose={handleClosePopup}
                            onSubmit={handleFormSubmit}
                        />
                    )}
                </div>
                <div className="table-div">
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.phone}</td>
                                    <td>{employee.email}</td>
                                    <td className="ActionBtn">
                                        <button onClick={() => handleEditClick(employee)}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button onClick={() => handleDeleteClick(employee.id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {showPopupE && (
                    <EditEmployee
                        employee={selectedEmployee}
                        onClose={handleClosePopupE}
                        onSubmit={handleFormSubmit}
                    />
                )}
            </div>
        </div>
    );
};

export default Hero;

