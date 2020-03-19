import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import ContactForm from "./ContactForm";

test("The first name input is present", () => {
    const { getByText } = render(<ContactForm />);

    getByText("First Name*");
});

test("The last name is present", () => {
    const { getByText } = render(<ContactForm />);
    getByText(/last name/i);
});

test("The email input is present", () => {
    const { getByText } = render(<ContactForm />);
    getByText(/email/i);
});

test("Are all 3 inputs working properly?", async () => {
    const { getByLabelText, getByRole, getByTestId, findByText, findAllByText } = render(<ContactForm />);

    const firstNameInput = getByLabelText(/first name*/i);
    const lastNameInput = getByLabelText(/last name*/i);
    const emailInput = getByLabelText(/email*/i);
    const submitButton = getByTestId("submit");

    fireEvent.change(getByLabelText(/first name*/i), {
        target: { name: "firstName", value: 'Mar' }
    });

    fireEvent.change(getByLabelText(/last name*/i), {
        target: { name: "lastName", value: 'Lewis' }
    });

    fireEvent.change(getByLabelText(/email*/i), {
        target: { name: "email", value: 'marvinlewis01@gmail.com' }
    });

    fireEvent.click(submitButton);

    await findAllByText(/marv/i);
    await findByText(/lewis/i);
    await findAllByText(/email/i);

});

