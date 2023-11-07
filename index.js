import inquirer from "inquirer";
class Student {
    studentID; // Add a studentID property
    name;
    coursesEnrolled;
    balance;
    constructor(name) {
        this.studentID = this.generateStudentID(); // Generate a studentID
        this.name = name;
        this.coursesEnrolled = [];
        this.balance = 0;
    }
    // Generate a 5-digit unique studentID
    generateStudentID() {
        const min = 10000;
        const max = 99999;
        return Math.floor(Math.random() * (max - min + 1) + min).toString();
    }
    enroll(course, tuition) {
        this.coursesEnrolled.push(course);
        this.balance += tuition;
    }
    viewBalance() {
        console.log(`Balance for ${this.name} (Student ID: ${this.studentID}): Rs${this.balance}`);
    }
    payTuition(amount) {
        this.balance -= amount;
        console.log(`Paid Rs${amount} of tuition for ${this.name} (Student ID: ${this.studentID}).`);
    }
    showStatus() {
        console.log(`Student ID: ${this.studentID}`);
        console.log(`Name: ${this.name}`);
        console.log('Courses Enrolled:');
        this.coursesEnrolled.forEach((course) => {
            console.log(`- ${course}`);
        });
        this.viewBalance();
    }
}
const students = [];
const registerStudent = () => {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'name',
            message: "Enter student's name:",
        },
    ])
        .then((answers) => {
        const student = new Student(answers.name);
        students.push(student);
        console.log(`${answers.name} has been registered with Student ID: ${student.studentID}`);
        mainMenu();
    });
};
const enrollStudent = () => {
    inquirer
        .prompt([
        {
            type: 'list',
            name: 'studentName',
            message: 'Select a student to enroll in a course:',
            choices: students.map((student) => student.name),
        },
        {
            type: 'input',
            name: 'course',
            message: 'Enter the course name:',
        },
        {
            type: 'number',
            name: 'tuition',
            message: 'Enter the tuition fee (Rs):',
        },
    ])
        .then((answers) => {
        const student = students.find((s) => s.name === answers.studentName);
        if (student) {
            student.enroll(answers.course, answers.tuition);
            console.log(`${answers.studentName} has been enrolled in ${answers.course}.`);
            mainMenu();
        }
        else {
            console.log('Student not found.');
            mainMenu();
        }
    });
};
const mainMenu = () => {
    inquirer
        .prompt([
        {
            type: 'list',
            name: 'option',
            message: 'Choose an option:',
            choices: [
                'Register a Student',
                'Enroll a Student',
                'View Student Status',
                'View Balance',
                'Pay Tuition',
                'Exit',
            ],
        },
    ])
        .then((answers) => {
        switch (answers.option) {
            case 'Register a Student':
                registerStudent();
                break;
            case 'Enroll a Student':
                enrollStudent();
                break;
            case 'View Student Status':
                inquirer
                    .prompt([
                    {
                        type: 'list',
                        name: 'studentName',
                        message: 'Select a student to view status:',
                        choices: students.map((student) => student.name),
                    },
                ])
                    .then((answers) => {
                    const student = students.find((s) => s.name === answers.studentName);
                    if (student) {
                        student.showStatus();
                    }
                    else {
                        console.log('Student not found.');
                    }
                    mainMenu();
                });
                break;
            case 'View Balance':
                inquirer
                    .prompt([
                    {
                        type: 'list',
                        name: 'studentName',
                        message: 'Select a student to view balance:',
                        choices: students.map((student) => student.name),
                    },
                ])
                    .then((answers) => {
                    const student = students.find((s) => s.name === answers.studentName);
                    if (student) {
                        student.viewBalance();
                    }
                    else {
                        console.log('Student not found.');
                    }
                    mainMenu();
                });
                break;
            case 'Pay Tuition':
                inquirer
                    .prompt([
                    {
                        type: 'list',
                        name: 'studentName',
                        message: 'Select a student to pay tuition:',
                        choices: students.map((student) => student.name),
                    },
                    {
                        type: 'number',
                        name: 'tuitionAmount',
                        message: 'Enter the tuition amount to pay (Rs):',
                    },
                ])
                    .then((answers) => {
                    const student = students.find((s) => s.name === answers.studentName);
                    if (student) {
                        student.payTuition(answers.tuitionAmount);
                        mainMenu();
                    }
                    else {
                        console.log('Student not found.');
                        mainMenu();
                    }
                });
                break;
            case 'Exit':
                console.log('Goodbye!');
                break;
        }
    });
};
console.log('Welcome to the Student Management System');
mainMenu();
