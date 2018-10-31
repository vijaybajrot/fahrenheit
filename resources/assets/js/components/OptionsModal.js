import React, { Component } from 'react';
import { translate, setLanguage, getLanguage } from 'react-multi-lang';
const Header = {
    padding: "10px 20px",
    textAlign: "center",
    color: "red",
    fontSize: "14px"
  }

class OptionsModal extends Component {

  constructor(props){
        super(props);
        this.state = {generalInformation: '',role:'user'};
        this.handleGeneralSubmit = this.handleGeneralSubmit.bind(this);
        this.changeState = this.changeState.bind(this);
      }


       componentDidMount(){
        jQuery(".help-toggle").unbind('click');
        jQuery(".help-toggle").click(function(){
            jQuery(".input-help-label").toggle();
        });
        var that=this;
        $('form.option-information-form input[required]').on('change invalid', function() {
            var textfield = $(this).get(0);

            // 'setCustomValidity not only sets the message, but also marks
            // the field as invalid. In order to see whether the field really is
            // invalid, we have to remove the message first
            textfield.setCustomValidity('');

            if (!textfield.validity.valid) {
              textfield.setCustomValidity(that.props.t('RequiredField.ErrorMsg'));
            }
        });
        jQuery('body').on('click', function (e) {
            jQuery('[data-toggle="popover"').each(function () {
                //the 'is' for buttons that trigger popups
                //the 'has' for icons within a button that triggers a popup
                if (!jQuery(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                    jQuery(this).popover('hide');
                }
            });
        });
           $('.close-modal-general').on('click', function (e) {
               if ($('.option-information-form').hasClass('form-edited')) {
                   // alert('eeee')
                   e.preventDefault();
                   $('#general-modal-confirm').modal('show');
               }
               else {
                   $('#option-information').modal('hide');
                   $('.option-information-form')[0].reset()
               }
           })
               //Do stuff here

          }
          initializeAutocomplete(elem){
            var input = document.getElementById(elem.target.id);
            // var options = {
            //   types: ['(regions)'],
            //   componentRestrictions: {country: "IN"}
            // };
            var options = {}

            var autocomplete = new google.maps.places.Autocomplete(input,options);

            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                var place = autocomplete.getPlace();
                var lat = place.geometry.location.lat();
                var lng = place.geometry.location.lng();
                var placeId = place.place_id;
                // to set city name, using the locality param
                var componentForm = {
                    locality: 'short_name',
                };

                console.log(lat,lng);
                // initialize(lat, lng);
                // //Drawing map on the basis of latitude and longitude.
                // getMapInfo(lat, lng,place)
            });
          }




handleGeneralSubmit(event) {
    event.preventDefault();
    const that = this;

       var location    = $(".option-information-form").find("input[name=location]").val();
       var address    = $(".option-information-form").find("input[name=address]").val();


        fetch('adcalc/storeProfileInformation', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                     location: location,
                     address: address

                })
        })
         .then((a) => {return a.json();})
        .then(function (data) {
                            $(".option-information-form").find('.invalid-feedback').hide();
                            jQuery.each(data.errors, function(key, value){
                                $(".option-information-form").find('#'+value).siblings('.invalid-feedback').show();
                            });

                            if(typeof data.errors=="undefined"){
                                var $form = $(".option-information-form");
                                var data = that.getFormData($form);
                                //console.log(data);
                                that.setState({
                                    generalInformation:data
                                })
                                that.changeState(that.state.generalInformation);
                                GENERAL_FORM_STATUS=true;
                                $("#option-information").modal("hide");

                            }
        })
        .catch((err) => {console.log(err)})



  }
  changeState(generalInformation){
    var result={
        generalInformation:generalInformation,
        state:true
    }
    CHANGE_FORM=true;
    this.props.onGeneralSubmit(result);
  }

  getFormData($form){
        var unindexed_array = $form.serializeArray();
        var indexed_array = {};

        $.map(unindexed_array, function(n, i){
            indexed_array[n['name']] = n['value'];
        });

        return indexed_array;
    }


    render() {
        projectData['generalData']=this.state.generalInformation;


        return (
            <div className="modal modal_multi"  role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" id="profile-information">
            <div className="modal-content">
              <div className="modal-heading">
                <div className="left-head"> Options</div>
                <div className="right-head">
                  <ul className="list-inline">
                  <li> <input className="save-changes-btn" type="submit" alt="Submit" value={this.props.t('SaveButton')} title={this.props.t('SaveButton')}/></li>
                   <li><span className="close close_multi"><img src="public/images/cancle-icon.png" alt="" className="close-modal-general"  aria-label="Close"/></span></li>
                  </ul>
                </div>
              </div>
              <div className="modal-body-content">
                <ul id="tabsJustified2" className="nav nav-tabs project-specifications">
                  <li className="nav-item"><a href="" data-target="#option-general" data-toggle="tab" className="nav-link small active">GENERAL</a></li>
                  <li className="nav-item disabled"><a href="" data-target="#project-specification" data-toggle="tab" className="nav-link">PROJECT
                      SPECIFICATIONS</a></li>
                </ul>
                <div id="tabsJustifiedContent2" className="tab-content">
                  <div id="option-general" className="tab-pane fade  active show">
                    <div className="option-general-div">
                      <div className="table-responsive">
                        <table className="table">
                          <tr>
                            <td className="input-label"> Language:</td>
                            <td className="input-help-label"><button type="button" className="" data-container="body" data-toggle="popover"  data-trigger="hover"
                                data-placement="bottom" data-content="Project number explanation/tip" >
                                <img src="public/images/help-red.png" alt="" />
                              </button>
                            </td>
                            <td className="input-fields">
                              <ul className="list-inline">
                                <li><img src="public/images/germany-flag.png" alt="" /></li>
                                <li><img src="public/images/united-kingdom.png" alt="" /></li>
                                <li><img src="public/images/poland-flag.png" alt="" /></li>
                                <li><img src="public/images/italy.png" alt="" /></li>
                                <li><img src="public/images/greece-flag.png" alt="" /></li>
                              </ul>
                            </td>
                          </tr>
                          <tr>
                            <td className="input-label">BAFA 2018:</td>
                            <td className="input-help-label"><button type="button" className="" data-container="body" data-toggle="popover"  data-trigger="hover"
                                data-placement="bottom" data-content="Here you can enter your name, so it can appear in the report and we can contact you when we have questions about your project.">
                                <img src="public/images/help-red.png" alt="" />
                              </button>
                            </td>
                            <td className="input-fields">
                              <select name="profile_bafa" id="profile_bafa">
                                <option value="calculate">Calculate</option>
                                <option value="Do not calculate">Do not calculate</option>
                              </select>
                            </td>
                          </tr>
                          <tr>
                            <td className="input-label">Re-cooling Method:</td>
                            <td className="input-help-label"><button type="button" className="" data-container="body" data-toggle="popover"  data-trigger="hover"
                                data-placement="bottom" data-content="Customer explanation/tip">
                                <img src="public/images/help-red.png" alt="" />
                              </button>
                            </td>
                            <td className="input-fields">
                              <select onChange={(elem) => this.changeField(elem)} name="profile_recooling" id="profile_recooling">
                                <option value="Dry">Dry</option>
                                <option value="With spray tool">With spray tool</option>
                                <option value="Adiabatic">Adiabatic</option>
                                <option value="Hybrid">Hybrid</option>
                                <option value="Wet cooling tower">Wet cooling tower</option>
                                <option value="Other">Other </option>
                              </select>
                            </td>
                          </tr>
                          <tr>
                            <td className="input-label">Re-cooling Temperature:</td>
                            <td className="input-help-label"><button type="button" className="" data-container="body" data-toggle="popover"  data-trigger="hover"
                                data-placement="bottom" data-content="Contact explanation/tip">
                                <img src="public/images/help-red.png" alt="" />
                              </button>
                            </td>
                            <td className="input-fields"><input type="text" placeholder="25 °C" name="profile_recooling_temp" id="profile_recooling_temp" /></td>
                          </tr>
                          <tr>
                            <td className="input-label">Free Cooling:</td>
                            <td className="input-help-label"><button type="button" className="" data-container="body" data-toggle="popover"  data-trigger="hover"
                                data-placement="bottom" data-content="Customer explanation/tip">
                                <img src="public/images/help-red.png" alt="" />
                              </button>
                            </td>
                            <td className="input-fields">
                              <select>
                              <option value="No">No</option>
                                <option value="Yes (chilled water temperature)">Yes (chilled water temperature)</option>
                                <option value="Yes (cooling capacity)">Yes (cooling capacity)</option>
                                <option>option2</option>
                              </select>
                            </td>
                          </tr>
                          <tr>
                            <td className="input-label">Heat Sources:</td>
                            <td className="input-help-label"><button type="button" className="" data-container="body" data-toggle="popover"  data-trigger="hover"
                                data-placement="bottom" data-content="Customer explanation/tip">
                                <img src="public/images/help-red.png" alt="" />
                              </button>
                            </td>
                            <td className="input-fields">
                              <select>
                                <option value="Utilize also for heating load profile">Utilize also for heating load profile</option>
                                <option value="Ignore heating load profile">Ignore heating load profile</option>
                              </select>
                            </td>
                          </tr>
                          <tr>
                            <td className="input-label">Heat Supply:</td>
                            <td className="input-help-label"><button type="button" className="" data-container="body" data-toggle="popover"  data-trigger="hover"
                                data-placement="bottom" data-content="Customer explanation/tip">
                                <img src="public/images/help-red.png" alt="" />
                              </button>
                            </td>
                            <td className="input-fields">
                              <select>
                                <option value="Priority for heating load profile">Priority for heating load profile</option>
                                <option value="Priority for cooling load profile">Priority for cooling load profile</option>
                              </select>
                            </td>
                          </tr>
                          <tr>
                            <td className="input-label"> Conventional heat source:</td>
                            <td className="input-help-label"><button type="button" className="" data-container="body" data-toggle="popover"  data-trigger="hover"
                                data-placement="bottom" data-content="Location explanation/tip">
                                <img src="public/images/help-red.png" alt="" />
                              </button>
                            </td>
                            <td className="input-fields"><input type="text" placeholder="Boiler, 2x 100 kW"/></td>
                          </tr>
                          <tr>
                            <td className="input-label">Calculation method:</td>
                            <td className="input-help-label"><button type="button" className="" data-container="body" data-toggle="popover"  data-trigger="hover"
                                data-placement="bottom" data-content="Customer explanation/tip">
                                <img src="public/images/help-red.png" alt="" />
                              </button>
                            </td>
                            <td className="input-fields">
                              <select>
                                <option value="Chilled water inlet temperature constant">Chilled water inlet temperature constant</option>
                                <option value="Chilled water outlet temperature constant">Chilled water outlet temperature constant</option>
                              </select>
                            </td>
                          </tr>
                          <tr>
                            <td className="input-label">Ambient temperature step:</td>
                            <td className="input-help-label"><button type="button" className="" data-container="body" data-toggle="popover"  data-trigger="hover"
                                data-placement="bottom" data-content="Customer explanation/tip">
                                <img src="public/images/help-red.png" alt="" />
                              </button>
                            </td>
                            <td className="input-fields">
                              <select>
                                <option value="0.5">0.5 K</option>
                                <option value="1.0">1.0 k</option>
                                <option value="2.0">2.0 k</option>
                              </select>
                            </td>
                          </tr>
                          <tr>
                            <td className="input-label">Heating load profile:</td>
                            <td className="input-help-label"><button type="button" className="" data-container="body" data-toggle="popover"  data-trigger="hover"
                                data-placement="bottom" data-content="Customer explanation/tip">
                                <img src="public/images/help-red.png" alt="" />
                              </button>
                            </td>
                            <td className="input-fields">
                              <select>
                              <option value="Capacity [kW]">Capacity [kW]</option>
                                <option value="Energy [kWh]">Energy [kWh]</option>
                              </select>
                            </td>
                          </tr>
                          <tr>
                            <td className="input-label">Cooling load profile:</td>
                            <td className="input-help-label"><button type="button" className="" data-container="body" data-toggle="popover"  data-trigger="hover"
                                data-placement="bottom" data-content="Customer explanation/tip">
                                <img src="public/images/help-red.png" alt="" />
                              </button>
                            </td>
                            <td className="input-fields">
                              <select>
                                <option value="Capacity [kW]">Capacity [kW]</option>
                                <option value="Energy [kWh]">Energy [kWh]</option>
                              </select>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div id="project-specification" className="tab-pane fade">
                    <div className="personal-data-div">
                      <div className="table-responsive">
                        <table className="table">
                          <tr>
                            <td className="input-label">Bus system: </td>
                            <td className="input-help-label"><button type="button" className="" data-container="body" data-toggle="popover"  data-trigger="hover"
                                data-placement="bottom" data-content="Editor explanation/tip">
                                <img src="public/images/help-red.png" alt="" />
                              </button>
                            </td>
                            <td className="input-fields"><input type="text" placeholder=""/> </td>
                          </tr>
                          <tr>
                            <td className="input-label">Controller:</td>
                            <td className="input-help-label"><button type="button" className="" data-container="body" data-toggle="popover"  data-trigger="hover"
                                data-placement="bottom" data-content="Company explanation/tip">
                                <img src="public/images/help-red.png" alt="" />
                              </button>
                            </td>
                            <td className="input-fields"><input type="text" placeholder=""/></td>
                          </tr>
                          <tr>
                            <td className="input-label"> Pressure drop in the piping:</td>
                            <td className="input-help-label"><button type="button" className="" data-container="body" data-toggle="popover"  data-trigger="hover"
                                data-placement="bottom" data-content="Address explanation/tip">
                                <img src="public/images/help-red.png" alt="" />
                              </button>
                            </td>
                            <td className="input-fields"><input type="text" placeholder=""/> </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        );
    }
}

export default translate(OptionsModal);
