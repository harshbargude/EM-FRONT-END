import PropTypes from "prop-types";
import { useState } from "react";


const AddEmployeeForm = ({ onClose }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");



    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form submitted");
        onClose();

        //database
        const New_employee = { name, email, phone };
        console.log(New_employee);
        fetch("http://localhost:8090/employees", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(New_employee),
        }).then(() => console.log("New Employee Added"));


    };

    //Edit//

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Add Employee Details</h2>
                <div className="formDiv">
                    <form onSubmit={handleSubmit}>
                        
                            <input
                                type="text"
                                name="name"
                                placeholder="Employee Name..."
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        <br />
                        
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="Employee Email..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        
                        <br />
                        
                            <input
                                type="text"
                                name="phone"
                                placeholder="Employee No..."
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        
                        <br />
                        <div className="formButton-Div">
                            <button type="button" onClick={onClose} id="close">Close</button>
                            <button type="submit" id="ButtonSubmit">Submit</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    );
};

AddEmployeeForm.propTypes = {
    employee: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default AddEmployeeForm;
