// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const swaggerSpec: Record<string, any> = {
  openapi: "3.0.0",
  info: {
    title: "Vibe Partner API",
    version: "1.0.0",
    description: "API for booking developer services including async fixes, live sessions, and monthly retainers.",
  },
  tags: [
    { name: "Availability", description: "Public availability slots" },
    { name: "Booking", description: "Book a service" },
    { name: "Admin – Auth", description: "Admin authentication" },
    { name: "Admin – Availability", description: "Manage availability slots (admin)" },
    { name: "Admin – Bookings", description: "Manage bookings (admin)" },
  ],
  paths: {
    "/api/availability": {
      get: {
        tags: ["Availability"],
        summary: "Get available time slots",
        responses: {
          "200": {
            description: "List of available slots",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Slot" },
                },
              },
            },
          },
        },
      },
    },
    "/api/book": {
      post: {
        tags: ["Booking"],
        summary: "Create a booking without payment",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/BookingInput" },
            },
          },
        },
        responses: {
          "200": {
            description: "Booking created",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    bookingId: { type: "string", example: "abc123" },
                  },
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "409": { $ref: "#/components/responses/Conflict" },
        },
      },
    },
    "/api/checkout": {
      post: {
        tags: ["Booking"],
        summary: "Create a Stripe checkout session",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/BookingInput" },
            },
          },
        },
        responses: {
          "200": {
            description: "Stripe checkout session URL",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    url: { type: "string", example: "https://checkout.stripe.com/..." },
                  },
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "409": { $ref: "#/components/responses/Conflict" },
        },
      },
    },
    "/api/admin/login": {
      post: {
        tags: ["Admin – Auth"],
        summary: "Admin login",
        description: "Sets an HttpOnly cookie valid for 7 days on success.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["password"],
                properties: {
                  password: { type: "string", example: "secret" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Login successful",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { success: { type: "boolean", example: true } },
                },
              },
            },
          },
          "401": {
            description: "Invalid password",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Admin – Auth"],
        summary: "Admin logout",
        description: "Clears the admin_auth cookie.",
        responses: {
          "200": {
            description: "Logged out",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { success: { type: "boolean", example: true } },
                },
              },
            },
          },
        },
      },
    },
    "/api/admin/availability": {
      get: {
        tags: ["Admin – Availability"],
        summary: "Get all slots (admin)",
        responses: {
          "200": {
            description: "All availability slots",
            content: {
              "application/json": {
                schema: { type: "array", items: { $ref: "#/components/schemas/Slot" } },
              },
            },
          },
        },
      },
      post: {
        tags: ["Admin – Availability"],
        summary: "Create a new slot",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SlotInput" },
            },
          },
        },
        responses: {
          "201": {
            description: "Slot created",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Slot" } },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
        },
      },
      delete: {
        tags: ["Admin – Availability"],
        summary: "Delete a slot",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["id"],
                properties: { id: { type: "string", example: "slot_abc" } },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Slot deleted",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { success: { type: "boolean", example: true } },
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
        },
      },
    },
    "/api/admin/bookings/{id}": {
      patch: {
        tags: ["Admin – Bookings"],
        summary: "Update booking status",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "Booking ID",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["status"],
                properties: {
                  status: {
                    type: "string",
                    enum: ["pending", "confirmed", "completed", "cancelled"],
                    example: "confirmed",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Status updated",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { success: { type: "boolean", example: true } },
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
        },
      },
    },
  },
  components: {
    schemas: {
      Slot: {
        type: "object",
        properties: {
          id: { type: "string", example: "slot_xyz" },
          date: { type: "string", example: "2026-05-01" },
          startTime: { type: "string", example: "10:00" },
          endTime: { type: "string", example: "11:00" },
          isBooked: { type: "boolean", example: false },
        },
      },
      SlotInput: {
        type: "object",
        required: ["date", "startTime", "endTime"],
        properties: {
          date: { type: "string", example: "2026-05-01" },
          startTime: { type: "string", example: "10:00" },
          endTime: { type: "string", example: "11:00" },
        },
      },
      BookingInput: {
        type: "object",
        required: ["name", "email", "serviceType", "description"],
        properties: {
          name: { type: "string", example: "Jane Doe" },
          email: { type: "string", format: "email", example: "jane@example.com" },
          serviceType: {
            type: "string",
            enum: ["async", "live", "monthly"],
            example: "live",
          },
          description: { type: "string", example: "My app crashes on login." },
          repoLink: { type: "string", example: "https://github.com/user/repo" },
          slotId: { type: "string", example: "slot_xyz", description: "Required when serviceType is 'live'" },
        },
      },
      Error: {
        type: "object",
        properties: {
          error: { type: "string", example: "Missing required fields" },
        },
      },
    },
    responses: {
      BadRequest: {
        description: "Bad request",
        content: {
          "application/json": { schema: { $ref: "#/components/schemas/Error" } },
        },
      },
      NotFound: {
        description: "Resource not found",
        content: {
          "application/json": { schema: { $ref: "#/components/schemas/Error" } },
        },
      },
      Conflict: {
        description: "Conflict – slot already booked",
        content: {
          "application/json": { schema: { $ref: "#/components/schemas/Error" } },
        },
      },
    },
  },
};
