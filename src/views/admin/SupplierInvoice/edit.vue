<template>
  <back>
    <v-form>
      <v-container class="fill-height">
        <v-row align="center" justify="center" v-if="supplier">
          <v-col>
            <h1>sinvoice</h1>
          </v-col>
          <v-col cols="12" sm="8" md="6">
            <v-card class="mx-auto"> </v-card>
          </v-col>
          <v-col cols="12" sm="8" md="3" align="center" justify="center">
            <v-img
              max-height="150"
              max-width="150"
              contain
              :src="`http://localhost:5000/imgs/dashboard/chantosweb.jpeg`"
            ></v-img>
            <h1>Chantosweb developers</h1>
            <p>Myrachanto@gmail.com</p>
            <p>www.chantosweb.com</p>
          </v-col>
        </v-row>
        <v-row align="center" justify="center" v-if="supplier">
          <v-col cols="12" sm="8" md="4">
            <v-card class="mx-auto">
              <v-card-title>Phone: {{ supplier.phone }}</v-card-title>
              <v-card-title>Code: {{ sinvoice.code }}</v-card-title>
            </v-card>
          </v-col>
          <v-col cols="12" sm="8" md="4">
            <v-card class="mx-auto">
              <v-card-title>supplier Name: {{ supplier.name }} </v-card-title>
              <v-card-title>Company: {{ supplier.company }}</v-card-title>
            </v-card>
          </v-col>
          <v-col cols="12" sm="8" md="4">
            <v-card class="mx-auto" min-height="130">
              <p class="display-1">address:{{ supplier.address }}</p>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="12">
            <v-card>
              <template>
                <v-snackbar :timeout="timeout" v-model="snackbar" :value="true" absolute left shaped top dismisable color="red">
                  <h2>{{errs.error}}</h2>
                  <p>{{errs.message}}</p>
                </v-snackbar>

              </template>
              <div v-if="stransactions.length > 0">
                 <div><h1>Products</h1></div>
              <v-data-table
                :headers="transactionheader"
                :items="stransactions"
                item-key="ID"
                class="elevation-1 display-2"
                style="font-size: 10rem"
                :footer-props="{
                  'items-per-page-options': [5, 10, 20, 30, 40, 50],
                }"
                :items-per-page="10"
              >
                <template v-slot:item.actions="{ item }">
                  <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                  </v-icon>
                </template>
              </v-data-table>
              </div>
              <div v-if="credits.length > 0">
              <div><h1>Credit Contents</h1></div>
               <v-data-table
                :headers="transactionheader"
                :items="credits"
                item-key="ID"
                class="elevation-1 display-2"
                style="font-size: 10rem"
                :footer-props="{
                  'items-per-page-options': [5, 10, 20, 30, 40, 50],
                }"
                :items-per-page="10"
              >
              </v-data-table>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-if="expences.length > 0">
          <v-col>
            <v-card>
                 <div><h1>Expences</h1></div>
                  <v-data-table
                :headers="expenceheaders"
                :items="expences"
                item-key="ID"
                class="elevation-1 display-2"
                style="font-size: 10rem"
                :footer-props="{
                  'items-per-page-options': [5, 10, 20, 30, 40, 50],
                }"
                :items-per-page="10"
              >
                <template v-slot:item.actions="{ item }">
                  <v-icon small class="mr-2" @click="editItemExpence(item)">
                    mdi-pencil
                  </v-icon>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <h1>Instructions</h1>
            <p>{{ sinvoice.Instructions }}</p>
          </v-col>
          <v-col cols="12" md="4">
            <h1>Terms And Conditions</h1>
            <p>{{ sinvoice.terms }}</p>
            </v-col
          >

          <v-col cols="12" md="4">
            <v-card class="mx-auto">
              <v-card-title>Discount: {{ sinvoice.discount }} </v-card-title>
              <v-card-title>Tax: {{ sinvoice.tax }}</v-card-title>
              <v-card-title>Amount: {{ sinvoice.total }}</v-card-title>
            </v-card>
          </v-col>
        </v-row>
         <v-row align="center" justify="center">
          <v-col cols="12" md="12" align="center" justify="center">
            <v-btn color="red" @click="cancelcredit(sinvoice.code)">Cancel the credit note</v-btn>
            <v-btn color="green" @click="savecredit(sinvoice.code)">Process the credit note</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Credit item Quantity</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="form.quantity"
                  type="number"
                  label="Quantity"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
          <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogExpence" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Credit Expence</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="expence.name"
                  label="Expence"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeExpence"> Cancel </v-btn>
          <v-btn color="blue darken-1" text @click="saveExpence"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </back>
</template>

<script>
import axios from "@/axios";

import back from "@/layouts/back";

export default {
  name: "suppliershow",
  components: {
    back,
  },
  data() {
    return {
      form: {},
      defaultItem: "",
      errs: {},
      option: {},
      title: "Create",
      init: "api/sinvoice",
      redirect: "/sinvoice",
      store: "api/sinvoice",
      cred: "api/sinvoice/credit",
      cart: "api/carts",
      cancel: 'api/carts',
      method: "post",
      snackbar: false,
      timeout: 3000,
      supplier: {},
      sinvoice: {},
      dialog: false,
      dialogExpence: false,
      stransactions: [],
      credits: [],
      expence:{},
      expences: [],
      expenceheaders: [
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Title',
          value: 'title'
        },
        {
          text: 'Description',
          value: 'description'
        },
        {
          text: 'Amount',
          value: 'amount'
        },
        {
          text: 'Mode',
          value: 'mode'
        },
        {
          text: 'Actions',
          value: 'actions'
        },
      ],
      transactionheader: [
        {
          text: "Name",
          value: "name",
        },
        {
          text: "sinvoice No",
          value: "code",
        },
        {
          text: "Quantity",
          value: "quantity",
        },
        {
          text: "Price",
          value: "price",
        },
        {
          text: "Tax",
          value: "tax",
        },
        {
          text: "Discount",
          value: "discount",
        },
        {
          text: "Amount",
          value: "total",
        },
        {
          text: "Actions",
          value: "actions",
        },
      ],
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
    editItem(item) {
      //  console.log(item)
      this.editedIndex = this.stransactions.indexOf(item);
      this.form = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    editItemExpence(item) {
      //  console.log(item)
      this.editedIndex = this.expences.indexOf(item);
      this.expence = Object.assign({}, item);
      this.dialogExpence = true;
    },
    closeExpence() {
      this.dialogExpence = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async save() {
      try {
        let fd = new FormData();
        fd.append("quantity", this.form.quantity);
        fd.append("name", this.form.name);
        fd.append("code", this.form.code);
        await axios.post("api/carts/credit", fd, {
          "Content-Type": "multipart/form-data",
        });
        this.close()
        this.fetchCreditData()
      } catch (err) {
        this.close()
        this.snackbar = true;
        this.errs = err.response.data
      }
    },
    async saveExpence() {
      try {
        let fd = new FormData();
        fd.append("name", this.expence.name);
        fd.append("code", this.sinvoice.code);
        await axios.post("api/expence/transaction", fd, {
          "Content-Type": "multipart/form-data",
        });
        this.closeExpence()
        this.fetchCreditData()
      } catch (err) {
        this.closeExpence()
        this.snackbar = true;
        this.errs = err.response.data
      }
    },

    async savecredit(code) {
      try {
        let fd = new FormData();
        fd.append("code", code);
        await axios.post("api/sinvoice/credit", fd, {
          "Content-Type": "multipart/form-data",
        });

          this.$router.push(this.redirect);
      } catch (err) {
        this.snackbar = true;
        this.errs = err.response.data
      }
    },
    async credit() {
      try {
        let fd = new FormData();
        fd.append("code", this.form.code);
        const { data } = await axios.post(this.cred, fd, {
          "Content-Type": "multipart/form-data",
        });

        if (data) {
          this.$router.push(this.redirect);
        }
      } catch (err) {
        this.snackbar = true;
        this.errs = err;
      }
    },
    
    Edit(id) {
      this.$router.push(`${this.redirect}/${id}/edit`);
    },
    Back() {
      this.$router.push(this.redirect);
    },

    async cancelcredit(code) {
      try {
        const response = await axios.delete(`api/carts/cancel/${code}`)
        if (response) {
          this.$router.push(this.redirect)
        }
      } catch (err) {
        this.snackbar = true
        // console.log(err)
        this.errs = err.response.data

      }
    },
    async fetchData() {
      try {
        console.log(this.$route.params);
        const { data } = await axios.get(
          `${this.store}/${this.$route.params.id}`
        );
        const { supplier, sinvoices, stransactions, expences,grns } = data;
        this.supplier = supplier;
        this.stransactions = stransactions;
        this.sinvoice = sinvoices;
        this.expences = expences
        this.credits = grns
        this.fetchCreditData()
      } catch (err) {
        this.snackbar = true;
        //   console.log(err)
        this.errs = err.response.data;
      }
    },
    async fetchCreditData() {
      try {
        console.log(this.$route.params);
        const { data } = await axios.get(
          `api/carts/creditslist/${this.sinvoice.code}`
        );
        this.credits = data;
      } catch (err) {
        this.snackbar = true;
        //   console.log(err)
        this.errs = err.response.data;
      }
    },
  },
};
</script>

<style></style>
