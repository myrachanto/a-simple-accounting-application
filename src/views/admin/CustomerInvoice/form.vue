<template>
  <back>
    <v-form>
      <v-container class="fill-height">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="12">

                <v-autocomplete
                  v-model="customer"
                  :items="customerslist"
                  chips
                  clearable
                  hide-details
                  hide-selected
                  item-text="name"
                  item-value="name"
                  label="Search Customer..."
                  solo
                  @change="getCustomer(customer)"
                >
                  <template v-slot:no-data>
                    <v-list-item>
                      <v-list-item-title>
                        Search for 
                        <strong>Customer</strong>
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                  <template v-slot:selection="{ attr, on, item, selected }">
                    <v-chip
                      v-bind="attr"
                      :input-value="selected"
                      color="blue-grey"
                      class="white--text"
                      v-on="on"
                    >
                      <v-icon left>
                        mdi-account-circle
                      </v-icon>
                      <span v-text="item.name"></span>
                    </v-chip>
                  </template>
                  <template v-slot:item="{ item }">
                    <v-list-item-avatar
                      color="indigo"
                      class="headline font-weight-light white--text"
                    >
                      {{ item.name.charAt(0) }}
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.name"></v-list-item-title>
                      <v-list-item-subtitle v-text="item.company"></v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-icon>mdi-account-circle</v-icon>
                    </v-list-item-action>
                  </template>
                </v-autocomplete>
          </v-col>
        </v-row>
        <v-row align="center" justify="center" v-if="customer">
          <v-col cols="12" sm="8" md="4">
            <v-card class="mx-auto">
              <v-card-title>Phone: {{customer.phone}}</v-card-title>
              <v-card-title>Code: {{code}}</v-card-title>
            </v-card>
          </v-col>
          <v-col cols="12" sm="8" md="4">
            <v-card class="mx-auto">
              <v-card-title>Customer Name: {{customer.name}} </v-card-title>
              <v-card-title>Company: {{customer.company}}</v-card-title>
            </v-card>
          </v-col>
          <v-col cols="12" sm="8" md="4">
            <v-card class="mx-auto" min-height="130">
              <p class="display-1"> address:{{customer.address}}</p>
            </v-card>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">

          <v-col cols="12" md="3">
          
                <v-autocomplete
                  v-model="product"
                  :items="products"
                  chips
                  clearable
                  hide-details
                  hide-selected
                  item-text="name"
                  item-value=""
                  label="Search Product..."
                  solo
                >
                  <template v-slot:no-data>
                    <v-list-item>
                      <v-list-item-title>
                        Search for 
                        <strong>Product</strong>
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                  <template v-slot:selection="{ attr, on, item, selected }">
                    <v-chip
                      v-bind="attr"
                      :input-value="selected"
                      color="blue-grey"
                      class="white--text"
                      v-on="on"
                    >
                      <v-icon left>
                        mdi-account-circle
                      </v-icon>
                      <span v-text="item.name"></span>
                    </v-chip>
                  </template>
                  <template v-slot:item="{ item }">
                    <v-list-item-avatar
                      color="indigo"
                      class="headline font-weight-light white--text"
                    >
                      {{ item.name.charAt(0) }}
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.name"></v-list-item-title>
                      <v-list-item-subtitle >We have : {{item.qty}} left</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-icon>mdi-account-circle</v-icon>
                    </v-list-item-action>
                  </template>
                </v-autocomplete>
          </v-col>
          <v-col cols="12" md="1">
            <v-text-field v-model="form.quantity" label="Quantity" type="number" required></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field v-if="product" v-model="form.sprice" label="Price" required></v-text-field>
          </v-col>
          <v-col cols="12" md="1">
            <v-autocomplete v-if="taxlist" v-model="form.tax" :items="taxlist" dense filled label="Tax"></v-autocomplete>
          </v-col>
          <v-col cols="12" md="1">
            <v-autocomplete v-if="dsicountlist" v-model="form.discount" :items="dsicountlist" dense filled label="Discount"></v-autocomplete>
          </v-col>

          <v-col cols="12" md="1">
            <v-btn color="blue" @click="getamount">Calculate</v-btn>
          </v-col>
          <v-col cols="12" md="1">
            <span id="amount">KSH: {{productamount}}</span>
          </v-col>
          <v-col cols="12" md="2">
            <v-btn color="blue" @click="addproduct">Add product</v-btn>
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
              <v-data-table v-if="itemos" :headers="headers" :items="itemos" :items-per-page="5" class="elevation-1">
                <template v-slot:[`item.action`]="{ item }">
                  <v-icon small @click="DeleteCart(item.ID)">
                    mdi-delete
                  </v-icon>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
         <v-row>
          <v-col cols="12" md="12">
            <v-card>
              <div  align="right" justify="right"> 
            <v-btn color="primary" @click="addexpence">Add an Expence</v-btn></div>
              <v-data-table v-if="itemos" :headers="expenceheaders" :items="expencestrans" :items-per-page="5" class="elevation-1">
                <template v-slot:[`item.action`]="{ item }">
                  <v-icon small @click="DeleteExpence(item.ID)">
                    mdi-delete
                  </v-icon>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-textarea clearable clear-icon="mdi-close-circle" label="Instructions" v-model="invoicedetails.instructions" required></v-textarea>

          </v-col>
          <v-col cols="12" md="4">
            <v-textarea clearable clear-icon="mdi-close-circle" label="Terms and conditions" v-model="invoicedetails.terms" required></v-textarea>
          </v-col>

          <v-col cols="12" md="4">
            <v-card class="mx-auto" v-if="summary">
              <v-card-title>Discount: {{summary.discount}}</v-card-title>
              <v-card-title>Tax: {{summary.tax}}</v-card-title>
              <v-card-title>Expence: {{expencetotal}}</v-card-title>
              <v-card-title>Amount: {{summary.total + expencetotal}}</v-card-title>
            </v-card>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12" md="12" align="center" justify="center">
            <v-btn color="red" @click="cancelinvoice(code)">Cancel the invoice</v-btn>
            <v-btn color="green" @click="save(code)">Process the invoice</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
<v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Add expence to the invoice</span>
        </v-card-title>
        <v-card-text>
         <v-container>
            <v-row>
              <v-col cols="12">
                  <v-select
                    v-model="select"
                    :hint="`${select.name}, ${select.title}`"
                    :items="its"
                    item-text="name"
                    item-value="title"
                    label="Select"
                    persistent-hint
                    return-object
                    single-line
                  ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                v-model="form.description"
                  label="Description*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                v-model="form.amount"
                  label="Amount*"
                  type="number"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
          <v-btn color="blue darken-1" text @click="saveExpence"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </back>
</template>

<script>
import axios from '@/axios'

import back from '@/layouts/back'

export default {
  name: "login",
  components: {
    back
  },
  data() {
    return {
      form: {
        name: '',
        quantity: 0,
        sprice: 0,
        discount: 0,
        tax: 0
      },
      name: '',
      customer: {},
      errs: {},
      option: [],
      code: "",
      cartdata: {},
      customers: [],
      products: [],
      customerslist: [],
      // select: { name: 'product', quantity: 0 },
      items: [],
      search: null,
      model: {},
      isLoading: false,
      dsicountlist: [],
      paymentformlist: [],
      taxlist: [],
      title: 'Create',
      init: 'api/invoice/view',
      addcart: 'api/carts',
      cartview: 'api/carts/view',
      redirect: '/invoice',
      store: 'api/invoice',
      cancel: 'api/carts/cancel',
      method: 'post',
      snackbar: false,
      timeout: 3000,
      product: {},
      productamount: 0,
      dialog: false,
      expencetotal:0,
      // expences:[],
      expence: {},
      summary: {
        subtotal:0,
        discount: 0,
        tax: 0,
        total: 0
      },
      invoicedetails: {
        customername: '',
        terms: '',
        code: '',
        instructions: ''
      },
        select: { name: 'expence', title: 'Category' },
        its: [],
      headers: [{
          text: 'Product Name',
          value: 'name'
        },
        {
          text: 'Quantity',
          value: 'quantity'
        },
        {
          text: 'Price',
          value: 'SPrice'
        },
        {
          text: 'Tax',
          value: 'tax'
        },
        {
          text: 'Discount',
          value: 'discount'
        },
        {
          text: 'Total',
          value: 'Total'
        },
        {
          text: 'Action',
          value: 'action'
        },
      ],
      itemos: [],
      expencestrans :[],
      expenceheaders: [
        {
          text: 'Name',
          value: 'name'
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
          text: 'Action',
          value: 'action'
        },

      ]
    }
  },
  created() {
    this.fetchData()

  },
  methods: {
     addexpence() {
      //  console.log(item)
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async saveExpence() {
      try {
        let fd = new FormData();
        fd.append("name", this.select.name);
        fd.append("title", this.select.title);
        fd.append("description", this.form.description);
        fd.append("code", this.code);
        fd.append("amount", this.form.amount);
        fd.append("usercode", this.$store.getters.usercode);
        await axios.post("api/expencetransanctions", fd, {
          "Content-Type": "multipart/form-data",
        });
        this.close()
        this.fetchExpenceData(this.code)
      } catch (err) {
        this.close()
        this.snackbar = true;
        this.errs = err.response.data
      }
    },
    async addproduct() {
      try {
        // console.log(this.product)
        let fd = new FormData();
        fd.append("customername", this.customer.name)
        fd.append("customercode", this.customer.customercode) 
        fd.append("usercode", this.$store.getters.usercode);
        fd.append("name", this.product)
        fd.append("code", this.code)
        fd.append("quantity", this.form.quantity)
        fd.append("sprice", this.form.sprice)
        fd.append("tax", this.form.tax)
        fd.append("discount", this.form.discount)
        const response = await axios.post(this.addcart, fd, {
          'Content-Type': 'multipart/form-data'
        })
        if (response.status === 201) {
          this.fetchCartData(this.code)
          this.fetchExpenceData(this.code)
        }
      } catch (err) {
        this.snackbar = true
        this.errs = err.response.data

      }
    },
    getamount() {
      let grossamount = parseFloat(this.form.quantity) * parseFloat(this.form.sprice)
      let taxamount = parseFloat(this.form.tax) / 100 * grossamount
      let discountamount = parseFloat(this.form.discount) / 100 * grossamount
      console.log(grossamount, taxamount, taxamount)
      this.productamount = grossamount - discountamount + taxamount
    },
    Back() {
      this.$router.push(this.redirect)
    },
    getCustomer(name) {
      console.log(name)
      const customerinfo = this.customers.find(customer => {
        return customer.name == name
      })
      this.customer = customerinfo
    },
    GetProduct(name) {
      if (name) {
        let productinfo = this.products.find(product => {
          return product.name == name
        })
        this.product = productinfo
        // this.form.name =productinfo.name
        // this.form.sprice =productinfo.sprice
      }
    },
    async cancelinvoice(code) {
      try {
        const response = await axios.delete(`${this.cancel}/${code}`)
        if (response) {
          this.$router.push(this.redirect)
        }
      } catch (err) {
        this.snackbar = true
        // console.log(err)
        this.errs = err.response.data

      }
    },

    async save(code) {
      try {
        console.log(this.customer)
        let fd = new FormData();
        fd.append("customername", this.customer.name)
        fd.append("customercode", this.customer.customercode)
        fd.append("terms", this.invoicedetails.terms)
        fd.append("code", code)
        fd.append("instructions", this.invoicedetails.instructions)
        const response = await axios.post(this.store, fd, {
          'Content-Type': 'multipart/form-data'
        })
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
        // console.log(this.code)
        const {
          data
        } = await axios.get(`${this.init}`)
        const {
          code,
          customers,
          taxs,
          products,
          discounts,
          paymentforms,
          expences
        } = data
        // this.customers = customers
        this.products = products
        const customerslist = customers.map(d => {
          return {name:d.name,company:d.company}
        })
        const productlist = products.map(p => {
          return {name:p.name, qty:p.quantity}
        })
        const exps = expences.map(d => {
          let s = {
            name: d.name,
            title: d.title
          }
          return s
        })
        const taxlist = taxs.map(d => {
          return d.title
        })
        const dsicountlist = discounts.map(d => {
          return d.title
        })
        const paymentformlist = paymentforms.map(d => {
          return d.name
        })
        this.customers = customers
        this.customerslist = customerslist
        this.taxlist = taxlist
        this.dsicountlist = dsicountlist
        this.products = productlist
        this.its = exps
        // console.log(this.customerslist)
        // console.log(this.products)
        this.paymentformlist = paymentformlist
        this.code = code
        this.fetchCartData(this.code)
        this.fetchExpenceData(this.code)
      } catch (err) {
        console.log(err)
      }
    },
    async fetchCartData(code) {
      try {
        //  console.log(this.code)
        let {
          data
        } = await axios.get(`${this.cartview}/${code}`)
        this.itemos = data
        data.forEach(item => {
          this.summary.subtotal = +item.subtotal
          this.summary.tax = +item.tax
          this.summary.discount = +item.discount
          this.summary.total = +item.Total
          return this.summary
        })
      } catch (err) {
        //  console.log(err)
      }
    },
      async fetchExpenceData(code) {
      try {
        //  console.log(this.code)
        let {
          data
        } = await axios.get(`api/expencetransanctions/views/${code}`)
        this.expencestrans = data
        data.forEach(item => {
          this.expencetotal = +item.amount
          return this.expencetotal
        })
      } catch (err) {
        //  console.log(err)
      }
    },

    async DeleteCart(id) {
      try {
        //  console.log(this.code)
        await axios.delete(`api/carts/delete/${id}`)
        this.fetchCartData(this.code)
      } catch (err) {
        //  console.log(err)
      }
    },
    async DeleteExpence(id) {
      try {
        //  console.log(this.code)
        await axios.delete(`api/expencetransanctions/${id}`)
        this.fetchExpenceData(this.code)
      } catch (err) {
        //  console.log(err)
      }
    },
  }
}
</script>

<style>

</style>
