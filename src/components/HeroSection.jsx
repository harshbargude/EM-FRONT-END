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

    useEffect(() => {
        fetch("http://localhost:8090/employees")
            .then((res) => res.json())
            .then((result) => setEmployees(result));
    }, []); // Dependency array to avoid infinite loop

    const handleEditClick = (employee) => {
        setSelectedEmployee(employee);
        setShowPopupE(true);
    };

    const handleDeleteClick = (id) => {
        fetch(`http://localhost:8090/employees/${id}`, {
            method: "DELETE",
        }).then(() => {
            setEmployees(employees.filter((employee) => employee.id !== id));
        });
    };

    const handleFormSubmit = (updatedEmployee) => {
        if (selectedEmployee) {
            fetch(`http://localhost:8090/employees/${updatedEmployee.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedEmployee),
            }).then(() => {
                setEmployees((prev) =>
                    prev.map((emp) =>
                        emp.id === updatedEmployee.id ? updatedEmployee : emp
                    )
                );
            });
        } else {
            fetch("http://localhost:8090/employees", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedEmployee),
            })
                .then((res) => res.json())
                .then((newEmployee) => {
                    setEmployees([...employees, newEmployee]);
                });
        }

        handleClosePopup();
        handleClosePopupE();
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
                                        <div>
                                            <button onClick={() => handleEditClick(employee)} >
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                            {showPopupE &&
                                                (
                                                    <EditEmployee 
                                                        employee={selectedEmployee}
                                                        onClose={handleClosePopupE}
                                                        onSubmit={handleFormSubmit} 
                                                    />
                                                )}
                                        </div>
                                        <div>
                                            <button onClick={() => handleDeleteClick(employee.id)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Hero;
