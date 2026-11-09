const student = { $ref: "#/components/schemas/Student" };

const studentId = {
  name: "id",
  in: "path",
  required: true,
  schema: { type: "integer", minimum: 1 },
  example: 1
};

const studentBody = {
  required: true,
  content: {
    "application/json": {
      schema: {
        type: "object",
        required: ["name"],
        properties: {
          name: { type: "string", example: "Moussa Fall" }
        }
      }
    }
  }
};

const studentResponse = {
  description: "Student record",
  content: { "application/json": { schema: student } }
};

const badRequest = { description: "Invalid request body or missing name" };
const notFound = { description: "Student not found" };

module.exports = {
  openapi: "3.0.3",
  info: { title: "Studlist Student API", version: "1.0.0" },
  servers: [{ url: "/" }],
  paths: {
    "/students": {
      get: {
        summary: "List students",
        responses: {
          200: {
            description: "Student list",
            content: {
              "application/json": {
                schema: { type: "array", items: student }
              }
            }
          }
        }
      },
      post: {
        summary: "Create a student",
        requestBody: studentBody,
        responses: { 201: studentResponse, 400: badRequest }
      }
    },
    "/students/{id}": {
      parameters: [studentId],
      get: {
        summary: "Read a student",
        responses: { 200: studentResponse, 404: notFound }
      },
      put: {
        summary: "Update a student",
        requestBody: studentBody,
        responses: { 200: studentResponse, 400: badRequest, 404: notFound }
      },
      delete: {
        summary: "Delete a student",
        responses: { 204: { description: "Student deleted" }, 404: notFound }
      }
    }
  },
  components: {
    schemas: {
      Student: {
        type: "object",
        required: ["id", "name"],
        properties: {
          id: { type: "integer", example: 1 },
          name: { type: "string", example: "Mohamed Sylla" }
        }
      }
    }
  }
};
