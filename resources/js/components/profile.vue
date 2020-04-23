<template>
  <div>
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-3 mt-5">
            <!-- Profile Image -->
            <div class="card card-primary card-outline">
              <div class="card-body box-profile">
                <div class="text-center">
                  <img
                    class="profile-user-img img-fluid img-circle"
                    :src="imageProfile()"
                    alt="User profile picture"
                  />
                </div>

                <h3 class="profile-username text-center">Nina Mcintire</h3>

                <p class="text-muted text-center">Software Engineer</p>

                <ul class="list-group list-group-unbordered mb-3">
                  <li class="list-group-item">
                    <b>Followers</b>
                    <a class="float-right">1,322</a>
                  </li>
                  <li class="list-group-item">
                    <b>Following</b>
                    <a class="float-right">543</a>
                  </li>
                  <li class="list-group-item">
                    <b>Friends</b>
                    <a class="float-right">13,287</a>
                  </li>
                </ul>

                <a href="#" class="btn btn-primary btn-block">
                  <b>Follow</b>
                </a>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->

            <!-- About Me Box -->
            <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">About Me</h3>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <strong>
                  <i class="fas fa-book mr-1"></i> Education
                </strong>

                <p
                  class="text-muted"
                >B.S. in Computer Science from the University of Tennessee at Knoxville</p>

                <hr />

                <strong>
                  <i class="fas fa-map-marker-alt mr-1"></i> Location
                </strong>

                <p class="text-muted">Malibu, California</p>

                <hr />

                <strong>
                  <i class="fas fa-pencil-alt mr-1"></i> Skills
                </strong>

                <p class="text-muted">
                  <span class="tag tag-danger">UI Design</span>
                  <span class="tag tag-success">Coding</span>
                  <span class="tag tag-info">Javascript</span>
                  <span class="tag tag-warning">PHP</span>
                  <span class="tag tag-primary">Node.js</span>
                </p>

                <hr />

                <strong>
                  <i class="far fa-file-alt mr-1"></i> Notes
                </strong>

                <p
                  class="text-muted"
                >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum enim neque.</p>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
          <div class="col-md-9 mt-5">
            <div class="card">
              <div class="card-header p-2">
                <ul class="nav nav-pills">
                  <li class="nav-item">
                    <a class="nav-link active" href="#settings" data-toggle="tab">Settings</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#activity" data-toggle="tab">Activity</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#timeline" data-toggle="tab">Timeline</a>
                  </li>
                </ul>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <div class="tab-content">
                  <!-- /.tab-pane -->

                  <div class="tab-pane active" id="settings">
                    <form class="form-horizontal">
                      <div class="form-group row">
                        <label for="inputName" class="col-sm-2 col-form-label">Name</label>
                        <div class="col-sm-10">
                          <input
                            type="email"
                            class="form-control"
                            id="inputName"
                            name="name"
                            v-model="form.name"
                            placeholder="Name"
                            :class="{'is-invalid': form.errors.has('name')}"
                          />
                          <has-error :form="form" field="name"></has-error>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                          <input
                            type="email"
                            class="form-control"
                            id="inputEmail"
                            name="email"
                            v-model="form.email"
                            placeholder="Email"
                            :class="{'is-invalid': form.errors.has('email')}"
                          />
                          <has-error :form="form" field="email"></has-error>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputExperience" class="col-sm-2 col-form-label">Experience</label>
                        <div class="col-sm-10">
                          <textarea
                            class="form-control"
                            id="inputExperience"
                            name="bio"
                            v-model="form.bio"
                            placeholder="Experience"
                          ></textarea>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="photo" class="col-sm-2 col-form-label">Profile Photo</label>
                        <div class="col-sm-10">
                          <input
                            type="file"
                            @change="updatePhoto"
                            class="form-control-file"
                            id="photo"
                            name="photo"
                          />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="pwd" class="col-sm-2 col-form-label">Password(Optional)</label>
                        <div class="col-sm-10">
                          <input
                            type="password"
                            class="form-control"
                            id="pwd"
                            name="password"
                            placeholder="Password"
                            v-model="form.password"
                            :class="{'is-invalid': form.errors.has('password')}"
                          />
                          <has-error :form="form" field="password"></has-error>
                        </div>
                      </div>

                      <div class="form-group row">
                        <div class="offset-sm-2 col-sm-10">
                          <button
                            type="submit"
                            @click.prevent="updateProfile"
                            class="btn btn-success"
                          >Update</button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <!-- /.tab-pane -->
                  <div class="tab-pane" id="activity">
                    <!-- Post -->
                    <div class="post">
                      <div class="user-block">
                        <img
                          class="img-circle img-bordered-sm"
                          src="images/user.png"
                          alt="user image"
                        />
                        <span class="username">
                          <a href="#">Jonathan Burke Jr.</a>
                          <a href="#" class="float-right btn-tool">
                            <i class="fas fa-times"></i>
                          </a>
                        </span>
                        <span class="description">Shared publicly - 7:30 PM today</span>
                      </div>
                      <!-- /.user-block -->
                      <p>
                        Lorem ipsum represents a long-held tradition for designers,
                        typographers and the like. Some people hate it and argue for
                        its demise, but others ignore the hate as they create awesome
                        tools to help create filler text for everyone from bacon lovers
                        to Charlie Sheen fans.
                      </p>

                      <p>
                        <a href="#" class="link-black text-sm mr-2">
                          <i class="fas fa-share mr-1"></i> Share
                        </a>
                        <a href="#" class="link-black text-sm">
                          <i class="far fa-thumbs-up mr-1"></i> Like
                        </a>
                        <span class="float-right">
                          <a href="#" class="link-black text-sm">
                            <i class="far fa-comments mr-1"></i> Comments (5)
                          </a>
                        </span>
                      </p>

                      <input
                        class="form-control form-control-sm"
                        type="text"
                        placeholder="Type a comment"
                      />
                    </div>
                    <!-- /.post -->

                    <!-- Post -->
                    <div class="post clearfix">
                      <div class="user-block">
                        <img
                          class="img-circle img-bordered-sm"
                          src="images/user.png"
                          alt="User Image"
                        />
                        <span class="username">
                          <a href="#">Sarah Ross</a>
                          <a href="#" class="float-right btn-tool">
                            <i class="fas fa-times"></i>
                          </a>
                        </span>
                        <span class="description">Sent you a message - 3 days ago</span>
                      </div>
                      <!-- /.user-block -->
                      <p>
                        Lorem ipsum represents a long-held tradition for designers,
                        typographers and the like. Some people hate it and argue for
                        its demise, but others ignore the hate as they create awesome
                        tools to help create filler text for everyone from bacon lovers
                        to Charlie Sheen fans.
                      </p>

                      <form class="form-horizontal">
                        <div class="input-group input-group-sm mb-0">
                          <input class="form-control form-control-sm" placeholder="Response" />
                          <div class="input-group-append">
                            <button type="submit" class="btn btn-danger">Send</button>
                          </div>
                        </div>
                      </form>
                    </div>
                    <!-- /.post -->
                  </div>
                  <!-- /.tab-pane -->
                  <div class="tab-pane" id="timeline">
                    <!-- The timeline -->
                    <div class="timeline timeline-inverse">
                      <!-- timeline time label -->
                      <div class="time-label">
                        <span class="bg-danger">10 Feb. 2014</span>
                      </div>
                      <!-- /.timeline-label -->
                      <!-- timeline item -->
                      <div>
                        <i class="fas fa-envelope bg-primary"></i>

                        <div class="timeline-item">
                          <span class="time">
                            <i class="far fa-clock"></i> 12:05
                          </span>

                          <h3 class="timeline-header">
                            <a href="#">Support Team</a> sent you an email
                          </h3>

                          <div class="timeline-body">
                            Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles,
                            weebly ning heekya handango imeem plugg dopplr jibjab, movity
                            jajah plickers sifteo edmodo ifttt zimbra. Babblely odeo kaboodle
                            quora plaxo ideeli hulu weebly balihoo...
                          </div>
                          <div class="timeline-footer">
                            <a href="#" class="btn btn-primary btn-sm">Read more</a>
                            <a href="#" class="btn btn-danger btn-sm">Delete</a>
                          </div>
                        </div>
                      </div>
                      <!-- END timeline item -->
                      <!-- timeline item -->
                      <div>
                        <i class="fas fa-user bg-info"></i>

                        <div class="timeline-item">
                          <span class="time">
                            <i class="far fa-clock"></i> 5 mins ago
                          </span>

                          <h3 class="timeline-header border-0">
                            <a href="#">Sarah Young</a> accepted your friend request
                          </h3>
                        </div>
                      </div>
                      <!-- END timeline item -->
                      <!-- timeline item -->
                      <div>
                        <i class="fas fa-comments bg-warning"></i>

                        <div class="timeline-item">
                          <span class="time">
                            <i class="far fa-clock"></i> 27 mins ago
                          </span>

                          <h3 class="timeline-header">
                            <a href="#">Jay White</a> commented on your post
                          </h3>

                          <div class="timeline-body">
                            Take me to your leader!
                            Switzerland is small and neutral!
                            We are more like Germany, ambitious and misunderstood!
                          </div>
                          <div class="timeline-footer">
                            <a href="#" class="btn btn-warning btn-flat btn-sm">View comment</a>
                          </div>
                        </div>
                      </div>
                      <!-- END timeline item -->
                      <!-- timeline time label -->
                      <div class="time-label">
                        <span class="bg-success">3 Jan. 2014</span>
                      </div>
                      <!-- /.timeline-label -->
                      <!-- timeline item -->
                      <div>
                        <i class="fas fa-camera bg-purple"></i>

                        <div class="timeline-item">
                          <span class="time">
                            <i class="far fa-clock"></i> 2 days ago
                          </span>

                          <h3 class="timeline-header">
                            <a href="#">Mina Lee</a> uploaded new photos
                          </h3>

                          <div class="timeline-body">
                            <img src="images/user.png" alt="..." />
                            <img src="images/user.png" alt="..." />
                            <img src="images/user.png" alt="..." />
                            <img src="images/user.png" alt="..." />
                          </div>
                        </div>
                      </div>
                      <!-- END timeline item -->
                      <div>
                        <i class="far fa-clock bg-gray"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- /.tab-content -->
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.nav-tabs-custom -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </section>
  </div>
</template>

<script>
// import Form from "vform";
export default {
  data() {
    return {
      user: {},
      form: new Form({
        id: "",
        name: "",
        email: "",
        bio: "",
        type: "",
        photo: "",
        password: ""
      })
    };
  },
  methods: {
    imageProfile() {
      let photo =
        this.form.photo.length > 200
          ? this.form.photo
          : "images/profile/" + this.form.photo;
      return photo;
    },
    updateProfile() {
      this.$Progress.start();
      this.form
        .put("api/profile")
        .then(() => {
          Toast.fire({
            icon: "info",
            title: "user info updated successfully"
          });
          this.$Progress.finish();
        })
        .catch(() => {
          this.$Progress.fail();
        });
    },
    updatePhoto(e) {
      // console.log('uploading');
      let file = e.target.files[0];
      // console.log(file);
      let reader = new FileReader();
      if (file["size"] < 2097152) {
        reader.onloadend = file => {
          console.log("RESULT", reader.result);
          this.form.photo = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        Swal.fire("Failed!", "the size of image more then 2MB", "error");
      }
    }
  },
  mounted() {
    console.log("Component mounted.");
  },
  created() {
    axios.get("api/profile").then(({ data }) => this.form.fill(data));
  }
};
</script>
