import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateIncident from "./CreateIncident";
jest.mock("./style.css", () => ({}));

// globally for all test 1-3
global.fetch = jest.fn();

// Test #1
test("renders the empty form correctly", () => {
  render(<CreateIncident isOpen={true} />);

  expect(screen.getByPlaceholderText("Incident Title")).toBeInTheDocument();
  expect(screen.getByLabelText("Category")).toBeInTheDocument();
  expect(screen.getByLabelText("Priority")).toBeInTheDocument();
});

// Test #2
test("accepts CreateIncident input", () => {
  render(<CreateIncident isOpen={true} />);

  fireEvent.change(screen.getByPlaceholderText("Incident Title"), {
    target: { value: "Test" },
  });

  expect(screen.getByPlaceholderText("Incident Title")).toHaveValue("Test");
});

// Test #3
test("accepts mock API input", async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ id: 1 }),
  });

  let created = false;
  const onCreated = () => (created = true);

  render(<CreateIncident isOpen={true} onIncidentCreated={onCreated} />);

  fireEvent.change(screen.getByPlaceholderText("Incident Title"), {
    target: { value: "X" },
  });
  fireEvent.change(screen.getByLabelText("Category"), {
    target: { value: "Malware" },
  });
  fireEvent.change(screen.getByLabelText("Priority"), {
    target: { value: "High" },
  });

  fireEvent.click(screen.getByRole("button", { name: /create/i }));

  await waitFor(() => expect(created).toBe(true));
});

// Test #4
test("handles submissions and sends", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ id: "123" }),
    }),
  );
  let submitted = null;

  const handleCreated = (data) => {
    submitted = data;
  };

  render(
    <CreateIncident
      isOpen={true}
      onIncidentCreated={handleCreated}
      onClose={() => {}}
    />,
  );

  fireEvent.change(screen.getByPlaceholderText("Incident Title"), {
    target: { value: "Test Title" },
  });
  fireEvent.change(screen.getByLabelText("Category"), {
    target: { value: "Other" },
  });
  fireEvent.change(screen.getByLabelText("Priority"), {
    target: { value: "Low" },
  });
  fireEvent.click(screen.getByRole("button", { name: /create/i }));

  await waitFor(() => {
    expect(submitted).not.toBeNull();
  });
  expect(submitted).toEqual({ id: "123" });
});
