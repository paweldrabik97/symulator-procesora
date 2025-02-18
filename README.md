# Intel 8086 Processor Simulator

## Description

This project is a simulator for the Intel 8086 processor, one of the first 16-bit processors from Intel. The simulator allows users to understand the fundamental operations of the Intel 8086 architecture, including register manipulation, memory addressing, and stack operations.

## Features

*   **Register Simulation:** Simulates the AX, BX, CX, and DX registers, allowing users to view and modify their values.
*   **MOV Instruction Simulation:** Implements the `MOV` instruction to transfer data between registers, memory locations, and immediate values.
*   **XCHG Instruction Simulation:** Implements the `XCHG` instruction to exchange data between registers or between a register and memory.
*   **Memory Addressing:** Supports base, indexed, and base-indexed addressing modes.
*   **PUSH and POP Instruction Simulation:** Implements the `PUSH` and `POP` instructions to simulate stack operations.
*   **Hexadecimal Input:** Accepts input in hexadecimal format for register values and memory addresses.
*   **User Interface:** Provides an interface to interact with the simulator, set register values, select addressing modes, and execute instructions.

## Instructions Supported

The simulator supports the following Intel 8086 instructions:

*   **MOV:**  Move data between registers, memory, and immediate values.
*   **XCHG:** Exchange data between registers or a register and memory.
*   **PUSH:** Push a register's value onto the stack.
*   **POP:** Pop a value from the stack into a register.

## Usage

1.  **Register Manipulation:** Enter hexadecimal values and click "Zapisz" (Save) to assign them to registers.
2.  **MOV Instruction:** Select source and destination registers and execute.
3.  **XCHG Instruction:** Select two registers and execute to exchange their contents.
4.  **Memory Addressing:** Enter values for base/index registers and offset, select an addressing mode to calculate a memory address.
5.  **PUSH/POP:** Select a register and execute PUSH to place its value on the stack. Select a register and execute POP to retrieve a value from the stack.

## Technologies Used

  *   React
  *   HTML
  *   CSS
  *   JavaScript

## Live Demo

A live demo of the application is available at: <https://storied-pie-a9ccde.netlify.app>

## Author

Paweł Drabik
