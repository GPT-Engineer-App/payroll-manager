import React, { useState } from "react";
import { Box, Button, Container, Flex, Heading, Input, Table, Tbody, Td, Th, Thead, Tr, VStack, Text, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployeeName, setNewEmployeeName] = useState("");
  const [newEmployeeSalary, setNewEmployeeSalary] = useState("");
  const toast = useToast();

  const handleAddEmployee = () => {
    if (!newEmployeeName || !newEmployeeSalary) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newEmployee = {
      id: employees.length + 1,
      name: newEmployeeName,
      salary: parseFloat(newEmployeeSalary),
    };
    setEmployees([...employees, newEmployee]);
    setNewEmployeeName("");
    setNewEmployeeSalary("");
    toast({
      title: "Employee Added",
      description: "New employee has been added successfully.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
    toast({
      title: "Employee Removed",
      description: "Employee has been removed successfully.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xl">
      <Heading as="h1" size="xl" my="8">
        Payroll Management System
      </Heading>
      <VStack spacing={4}>
        <Flex>
          <Input placeholder="Employee Name" value={newEmployeeName} onChange={(e) => setNewEmployeeName(e.target.value)} />
          <Input placeholder="Salary" type="number" value={newEmployeeSalary} onChange={(e) => setNewEmployeeSalary(e.target.value)} ml={2} />
          <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={handleAddEmployee} ml={2}>
            Add Employee
          </Button>
        </Flex>
        <Box w="full" overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th isNumeric>Salary ($)</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {employees.map((employee) => (
                <Tr key={employee.id}>
                  <Td>{employee.id}</Td>
                  <Td>{employee.name}</Td>
                  <Td isNumeric>{employee.salary.toFixed(2)}</Td>
                  <Td>
                    <Button leftIcon={<FaTrash />} colorScheme="red" onClick={() => handleDeleteEmployee(employee.id)}>
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
