import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { useState } from "react";
import { ProductType } from "@/db/model/Product";
import classes from "@/styles/InventoryPage.module.css";
import PrintIcon from "@/icons/print.svg";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "white",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
  },
  jsonData: {
    fontSize: 12,
    fontFamily: "Courier",
  },
});

const MyDocument = ({ dataToPrint }: DataPrintType) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Stock Quantity</Text>
        <Text style={styles.jsonData}>
          {JSON.stringify(dataToPrint, null, 2)}
        </Text>
      </View>
    </Page>
  </Document>
);

interface DataPrintType {
  dataToPrint: ProductType | unknown;
}

export default function PDFGenerator({ dataToPrint }: DataPrintType) {
  const [showPdf, setShowPdf] = useState<boolean>(false);
  // @ts-ignore
  const finalData = dataToPrint?.map((objectData: ProductType) => {
    return {
      name: objectData.name,
      Stock: objectData.stockQty,
      minStock: objectData.minStockQty,
    };
  });

  function generatePDF() {
    setShowPdf(true);
  }

  function closePDFViewer() {
    setShowPdf(false);
  }

  return (
    <div>
      <button className={classes.print_button} onClick={generatePDF}>
        <PrintIcon className={classes.printIcon} />
      </button>
      {showPdf && (
        <div>
          <button className={classes.cancelBtn} onClick={closePDFViewer}>
            Cancel
          </button>
          <PDFViewer style={{ width: "100%", height: "500px" }}>
            <MyDocument dataToPrint={finalData}></MyDocument>
          </PDFViewer>
        </div>
      )}
    </div>
  );
}
