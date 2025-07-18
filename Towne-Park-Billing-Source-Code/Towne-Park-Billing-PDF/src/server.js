require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
});

const fastify = require("fastify")({ logger: true });

const ReactPDF = require("@react-pdf/renderer");

const React = require("react");

const InvoiceComponent = require("./InvoiceComponent").default;

// Sample Invoice Data
const sampleInvoiceData = {
  invoiceNumber: 'INV-987654',
  billingPeriod: '2023-12',
  customer: {
    companyName: 'Acme Corporation',
    address: {
      line1: '123 Elm Street',
      line2: 'Floor 5',
      city: 'Springfield',
      state: 'IL',
      zip: '62704',
    },
  },
  provider: {
    name: 'Towne Park',
    address: {
      line1: '450 Plymouth Road',
      line2: 'Suite 300',
      city: 'Plymouth Meeting',
      state: 'PA',
      zip: '19462',
    },
  },
  items: [
    { description: 'Item 1', quantity: 3, price: 45.00 },
    { description: 'Item 2', quantity: 1, price: 30.00 },
    { description: 'Item 3', quantity: 6, price: 12.00 },
    { description: 'Item 4', quantity: 2, price: 17.50 },
    { description: 'Item 5', quantity: 8, price: 5.25 },
  ],
};

const sampleInvoiceDataREAL = {
  // this data comes from billing statement table
  createdMonth: "2024-10",
  customerSiteId: "7ba8bc40-4192-ef11-8a6a-0022480a57ac",
  id: "20d3bdca-be92-ef11-8a6a-0022480a57ac",
  servicePeriod: "September 1 - September 30, 2024",
  siteName: "Gaylord Opryland Hotel",
  siteNumber: "0170",
  totalAmount: 2990,
  // purchase order comes from contract table
  purchaseOrder: "",
  // this comes from customer site table
  customer: {
    accountManager: "Ryan Wood",
    accountManagerId: "1116106",
    address: "2800 Opryland Drive Nashville, TN 37214",
    billingContactEmail:
      "KEdgin@gaylordhotels.com;Kylie.Harrier@GaylordHotels.com",
    closeDate: null,
    customerSiteId: "7ba8bc40-4192-ef11-8a6a-0022480a57ac",
    district: "D - Nashville",
    glString: "02-02-4401-",
    invoiceRecipient: "ATTN: Accounts Payable",
    siteName: "Gaylord Opryland Hotel",
    siteNumber: "0170",
    startDate: "1999-10-01",
  },
  // this comes from general config table
  provider: {
    name: "Towne Park, LLC",
    address: "450 Plymouth Road, Suite 300, Plymouth Meeting, PA 19462",
    POBox: "79349, Baltimore, MD 21279-0349",
    phone: "800-291-6111",
    accountNumber: "85190688",
    ABA: "021-052-053",
    email: "accountsreceivable@townepark.com",
  },
  // this comes from invoices table
  invoices: [
    {
      amount: 1000,
      description: "1",
      invoiceDate: "2024-09-30",
      invoiceNumber: "0170-202409-01",
      lineItems: [
        {
          title: "Valet Services",
          description: null,
          code: "4700",
          amount: 1000,
        },
      ],
      paymentTerms: "Due on Receipt",
      title: "1",
      invoiceID: "",
    },
    {
      amount: 1000,
      description: "1",
      invoiceDate: "2024-09-30",
      invoiceNumber: "0170-202409-02",
      lineItems: [
        {
          title: "Valet Services",
          description: null,
          code: "4700",
          amount: 1000,
        },
      ],
      paymentTerms: "Due on Receipt",
      title: "1",
      invoiceID: "",
    },
  ],
};

fastify.get("/generate-invoice", async (request, reply) => {
  //   const { customerId, year, month } = request.query;
  //   if (!customerId || !year || !month) {
  //     return reply.status(400).send('Customer ID, year, and month are required');
  //   }

  try {
    // Utilize the sample invoice data instead of fetching from an API
    // const invoiceData = { ...sampleInvoiceData, billingPeriod: `${year}-${month}` };
    const invoiceData = { ...sampleInvoiceData };

    // Generate PDF stream with react-pdf
    reply.type("application/pdf");

    const pdfStream = await ReactPDF.renderToStream(
      <InvoiceComponent invoiceData={invoiceData} />
    );

    return reply.send(pdfStream);
  } catch (error) {
    fastify.log.error("Error generating invoice:", error);

    return reply
      .status(500)
      .send("An error occurred while generating the invoice");
  }
});

// Run the server! Docs -> https://fastify.dev/docs/latest/
fastify.listen({ port: 3000, host: "0.0.0.0" }, (err) => {
  if (err) {
    fastify.log.error(err);

    process.exit(1);
  }
});
