<template>
  <div class="container">
    <not-found v-if="!$permission.isAdminOrAuthor()"></not-found>
    <div class="row" v-if="$permission.isAdminOrAuthor()">
      <div class="col-md-12 mt-5">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Users List</h3>

            <div class="card-tools">
              <button class="btn btn-success" @click="addModel">
                Add user
                <i class="fas fa-user-plus fa-fw"></i>
              </button>
            </div>
          </div>
          <!-- /.card-header -->
          <div class="card-body table-responsive p-0">
            <table class="table table-hover text-nowrap">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Join At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users.data" :key="user.id">
                  <td>{{ user.id }}</td>
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.type | capitalize }}</td>
                  <td>{{ user.created_at | format }}</td>
                  <td>
                    <button class="btn btn-info" @click="editModel(user)">
                      <i class="fa fa-edit"></i>
                    </button>
                    <button class="btn btn-danger" @click="deleteUser(user.id)">
                      <i class="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- /.card-body -->
          <div class="card-footer">
            <pagination :data="users" @pagination-change-page="getResults"></pagination>
          </div>
        </div>
        <!-- /.card -->
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="adduser"
      tabindex="-1"
      role="dialog"
      aria-labelledby="adduserTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" v-show="!editmode" id="adduser">Add new user</h5>
            <h5 class="modal-title" v-show="editmode" id="adduser">Update user info</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="editmode ? updateUser() : createUser()">
            <div class="modal-body">
              <div class="form-group">
                <input
                  v-model="form.name"
                  type="text"
                  name="name"
                  placeholder="Name"
                  class="form-control"
                  :class="{
                                        'is-invalid': form.errors.has('name')
                                    }"
                />
                <has-error :form="form" field="name"></has-error>
              </div>
              <div class="form-group">
                <input
                  v-model="form.email"
                  type="email"
                  name="email"
                  placeholder="Email adress"
                  class="form-control"
                  :class="{
                                        'is-invalid': form.errors.has('email')
                                    }"
                />
                <has-error :form="form" field="email"></has-error>
              </div>
              <div class="form-group">
                <textarea
                  v-model="form.bio"
                  name="bio"
                  id="bio"
                  placeholder="Short bio for user (Optional)"
                  class="form-control"
                  :class="{
                                        'is-invalid': form.errors.has('bio')
                                    }"
                ></textarea>
                <has-error :form="form" field="bio"></has-error>
              </div>

              <div class="form-group">
                <select
                  name="type"
                  v-model="form.type"
                  id="type"
                  class="form-control"
                  :class="{
                                        'is-invalid': form.errors.has('type')
                                    }"
                >
                  <option value>Select User Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">Standard User</option>
                  <option value="author">Author</option>
                </select>
                <has-error :form="form" field="type"></has-error>
              </div>
              <div class="form-group">
                <input
                  v-model="form.password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  class="form-control"
                  :class="{
                                        'is-invalid': form.errors.has(
                                            'password'
                                        )
                                    }"
                />
                <has-error :form="form" field="password"></has-error>
              </div>
              <div class="form-group">
                <label for="photo">Image</label>
                <input type="file" name="photo" id="photo" class="form-control-file" />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
              <button type="submit" v-show="!editmode" class="btn btn-success">create</button>
              <button type="submit" v-show="editmode" class="btn btn-primary">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editmode: false,
      users: {},
      // Create a new form instance
      form: new Form({
        id: "",
        name: "",
        email: "",
        bio: "",
        type: "",
        password: ""
      })
    };
  },
  methods: {
    getResults(page = 1) {
      if (this.$permission.isAdminOrAuthor()) {
        axios.get("api/users?page=" + page).then(response => {
          this.users = response.data;
        });
      }
    },
    loadUsers() {
      if (this.$permission.isAdminOrAuthor()) {
        axios.get("api/users").then(({ data }) => {
          this.users = data;
        });
      }
    },
    updateUser() {
      this.form
        .put("api/users/" + this.form.id)
        .then(() => {
          $("#adduser").modal("hide");
          Toast.fire({
            icon: "info",
            title: "user info updated successfully"
          });
          Fun.$emit("refresh");
        })
        .catch(() => {
          Swal.fire("Failed!", "Update failed.", "warning");
        });
    },
    addModel() {
      this.form.clear();
      this.form.reset();
      this.editmode = false;
      $("#adduser").modal("show");
    },
    editModel(user) {
      this.form.fill(user);
      this.editmode = true;
      $("#adduser").modal("show");
    },
    deleteUser(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.form
            .delete("api/users/" + id)
            .then(() => {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              Fun.$emit("refresh");
            })
            .catch(() => {
              Swal.fire("Failed!", "failed to delete file.", "warning");
            });
        }
      });
    },
    createUser() {
      this.$Progress.start();
      // Submit the form via a POST request
      this.form
        .post("api/users")
        .then(() => {
          Fun.$emit("refresh");
          Toast.fire({
            icon: "success",
            title: "Signed in successfully"
          });
          $("#adduser").modal("hide");
          this.$Progress.finish();
        })
        .catch(() => {
          this.$Progress.fail();
        });
    }
  },
  created() {
    Fun.$on("searching", () => {
      let query = this.$parent.search;
      axios
        .get("api/findUser?q=" + query)
        .then(data => {
          this.users = data.data;
        })
        .catch(() => {});
    });
    // this.loadUsers();
    this.getResults();
    Fun.$on("refresh", () => {
      // this.loadUsers();
      this.getResults();
    });
  }
};
</script>
