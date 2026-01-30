import React, { useEffect, useRef } from "react";
import PageTitle from "./PageTitle";
import apiClient from "../api/apiClient";
import { useActionData, useNavigation, useSubmit, Form, useLoaderData } from "react-router";
import { toast } from "react-toastify";
// import { redirect } from "react-router"; // if want to redirect after form is submitted. not used in this project

export default function Contact() {
  const contactInfo = useLoaderData();
  const actionData = useActionData();
  const formRef = useRef(null); // to set the form as current value of reference 
  const navigation = useNavigation(); // to stop user from clicking the submit button multiple times when already submitted with navigation.state === "submitting"
  const submit = useSubmit(); // give more control on submission (normally, after user intereact with button, it'll just submit the form without any business logic)

  const isSubmitted = navigation.state === "submitting";

  useEffect(() => {
    if(actionData?.success){
        formRef.current?.reset(); // reset form after submitted without re-rendering Contact component
        toast.success("Your message has been submitted successfully.");
    }
  },[actionData] /* setiap kali ada perubahan pada form data */);

  const handleSubmit = (event) => {
    event.preventDefault(); // to avoid default browser behaviour which is submitting the form immediately and refresh the page
    const userConfirmed = window.confirm(
      "Are you sure you want to submit the form?"
    );

    if (userConfirmed) {
      const formData = new FormData(formRef.current); // Get form data
      submit(formData, { method: "post" }); // Proceed with form submission. submit() is from the useSubmit()
    } else {
      toast.info("Form submission cancelled.");
    }
  };

  const labelStyle =
    "block text-lg font-semibold text-gray-800 dark:text-lighter mb-2";
  const textFieldStyle =
    "w-full px-4 py-2 text-base border rounded-md transition border-primary dark:text-gray-200 dark:border-light outline-none focus:ring focus:ring-secondary focus:border-secondary bg-white dark:bg-gray-600 placeholder-gray-400 dark:placeholder-gray-300";
  return (
    <div className="max-w-[1152px] min-h-[852px] mx-auto px-6 py-8 bg-normalbg dark:bg-darkbg">
      {/* Page Title */}
      <PageTitle title="Contact Us" />
      {/* Contact Info */}
      <p className="max-w-[768px] mx-auto mt-8 text-gray-600 dark:text-dark mb-8 text-center">
        We'd love to hear from you! If you have any questions, feedback, or
        suggestions, please don't hesitate to reach out.
      </p>

     {/* different contact info displayed based on environment profile */}
      {/* Contact Info + Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-[952px] mx-auto mt-8">
        {/* Left: Contact Details */}
        <div className="text-primary dark:text-dark  p-6">
          <h2 className="text-2xl font-semibold mb-4">Contact Info</h2>
          {contactInfo && (
            <>
              <p className="mb-4">
                <strong>Phone:</strong> {contactInfo.phone}
              </p>
              <p className="mb-4">
                <strong>Email:</strong> {contactInfo.email}
              </p>
              <p className="mb-4">
                <strong>Address:</strong> {contactInfo.address}
              </p>
            </>
          )}
        </div>

      {/* Contact Form */}
      <Form
        method="POST"
        ref={formRef} /* use with useRef from react-router */
        onSubmit={handleSubmit} /* use with useSubmit from react-router and type="button" on button */
        className="space-y-6 max-w-[768px] mx-auto"
      >
        {/* Name Field */}
        <div>
          <label htmlFor="name" className={labelStyle}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your Name"
            className={textFieldStyle}
            required
            minLength={5}
            maxLength={30}
          />
          {
            actionData?.errors?.name && (
              <p className="text-red-500 text-sm mt-1">
                {actionData.errors.name}
              </p>
            )
          }
        </div>

        {/* Email and mobile Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className={labelStyle}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Your Email"
              className={textFieldStyle}
              required
            />
          {
            actionData?.errors?.email && (
              <p className="text-red-500 text-sm mt-1">
                {actionData.errors.email}
              </p>
            )
          }
          </div>

          {/* Mobile Field */}
          <div>
            <label htmlFor="mobileNumber" className={labelStyle}>
              Mobile Number
            </label>
            <input
              id="mobileNumber"
              name="mobileNumber"
              type="tel"
              required
              pattern="^\d{10}$"
              title="Mobile number must be exactly 10 digits"
              placeholder="Your Mobile Number"
              className={textFieldStyle}
            />
          {
            actionData?.errors?.mobileNumber && (
              <p className="text-red-500 text-sm mt-1">
                {actionData.errors.mobileNumber}
              </p>
            )
          }
          </div>
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className={labelStyle}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            placeholder="Your Message"
            className={textFieldStyle}
            required
            minLength={5}
            maxLength={500}
          ></textarea>
          {
            actionData?.errors?.message && (
              <p className="text-red-500 text-sm mt-1">
                {actionData.errors.message}
              </p>
            )
          }
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitted}
            className="px-6 py-2 text-xl rounded-md transition duration-200 text-dark bg-light dark:bg-dark hover:bg-gray-700 dark:text-light hover:dark:bg-gray-400"
          >{isSubmitted ? "Submitting..." : "Submit"}
          </button>
        </div>
      </Form>
      </div>
    </div>
  );
}

export async function contactAction({request}){
    const data = await request.formData();

    const contactData = {
        email: data.get("email"),
        name: data.get("name"),
        mobileNumber: data.get("mobileNumber"),
        message: data.get("message")
    };

    try {
        await apiClient.post("/contacts", contactData);
        return { success: true };
        // return redirect("/home"); // if want to redirect to any page after submitted
    } catch (error) {
        if(error.response?.status === 400){
          return { success: false, errors: error.response?.data}
        }
        throw new Response(
            error.response?.data?.errorMessage || error.message || "Failed to send message. Please try again.",
            { status: error.status || 500 }
        );
    }
}

export async function contactLoader() {
  try {
    const response = await apiClient.get("/contacts"); // Axios GET Request
    return response.data;
  } catch (error) {
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to fetch profile details. Please try again.",
      { status: error.status || 500 }
    );
  }
}