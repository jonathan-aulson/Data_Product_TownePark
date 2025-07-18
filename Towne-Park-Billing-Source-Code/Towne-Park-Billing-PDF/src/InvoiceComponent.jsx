import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  section: {
    marginBottom: 10,
    flexDirection: 'column',
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  customerDetails: {
    textAlign: 'left',
    fontSize: 10,
    maxWidth: '45%',
  },
  providerDetails: {
    textAlign: 'right',
    fontSize: 10,
    maxWidth: '45%',
  },
  table: {
    width: '100%',
    borderWidth: 1,
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '33.33%',
    padding: 5,
    wordWrap: 'break-word',
  },
  tableHeaderCol: {
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10,
  },
  total: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 12,
    textAlign: 'right',
  },
});

const renderHeader = (invoiceData) => (
  <View style={styles.section}>
    <Text style={styles.header}>Invoice</Text>
    <View style={styles.detailsSection}>
      <View style={styles.customerDetails}>
        <Text>Bill To:</Text>
        <Text>{invoiceData.customer.companyName}</Text>
        <Text>{invoiceData.customer.address.line1}, {invoiceData.customer.address.line2}</Text>
        <Text>{invoiceData.customer.address.city}, {invoiceData.customer.address.state} {invoiceData.customer.address.zip}</Text>
      </View>
      <View style={styles.providerDetails}>
        <Text>{invoiceData.provider.name}</Text>
        <Text>{invoiceData.provider.address.line1}, {invoiceData.provider.address.line2}</Text>
        <Text>{invoiceData.provider.address.city}, {invoiceData.provider.address.state} {invoiceData.provider.address.zip}</Text>
      </View>
    </View>
    <Text>Invoice Number: {invoiceData.invoiceNumber}</Text>
    <Text>Billing Period: {invoiceData.billingPeriod}</Text>
  </View>
);

const renderItemRows = (items) => (
  items.map((item, index) => (
    <View style={styles.tableRow} key={index}>
      <Text style={styles.tableCol}>{item.description}</Text>
      <Text style={styles.tableCol}>{item.quantity}</Text>
      <Text style={styles.tableCol}>${item.price.toFixed(2)}</Text>
    </View>
  ))
);

const calculateSubtotal = (items) => (
  items.reduce((sum, item) => sum + item.quantity * item.price, 0)
);

const InvoiceComponent = ({ invoiceData, itemsPerPage = 3 }) => {
  const chunkedItems = [];
  for (let i = 0; i < invoiceData.items.length; i += itemsPerPage) {
    chunkedItems.push(invoiceData.items.slice(i, i + itemsPerPage));
  }

  return (
    <Document>
      {chunkedItems.map((items, pageIndex) => {
        const subtotal = calculateSubtotal(items);
        return (
          <Page size="A4" style={styles.page} key={pageIndex}>
            {renderHeader(invoiceData)}
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableCol, styles.tableHeaderCol]}>Description</Text>
                <Text style={[styles.tableCol, styles.tableHeaderCol]}>Quantity</Text>
                <Text style={[styles.tableCol, styles.tableHeaderCol]}>Price</Text>
              </View>
              {renderItemRows(items)}
            </View>
            <Text style={styles.total}>Total Due This Page: ${subtotal.toFixed(2)}</Text>
            <Text style={styles.footer}>
              Page {pageIndex + 1} of {chunkedItems.length}
            </Text>
          </Page>
        );
      })}
    </Document>
  );
};

export default InvoiceComponent;
