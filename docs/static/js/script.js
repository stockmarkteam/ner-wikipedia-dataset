

Vue.component('annotation',{
  props: ['item'],
  data: function (){
    let data = {
     entity_type_name: ['人名','法人名','政治的組織名','その他組織名','地名','施設名','製品名','イベント名']
    };
    return data
  },
  computed: {
    marked_text: function () {
      let text_splitted = this.item.text.split(/{{(\d)\|(.*?)}}/);
      for (let entity_idx = 0; 3 * (entity_idx + 1) < text_splitted.length; entity_idx++) {
        let entity_type = text_splitted[3 * entity_idx + 1];
        let entity = text_splitted[3 * entity_idx + 2];
        text_splitted[3 * entity_idx + 1] = '';
        text_splitted[3 * entity_idx + 2] = `<span data-entity_idx='${entity_idx}' data-entity_type='${entity_type}'>${entity}<b style='font-size:80%;'>&nbsp;&nbsp;[${this.entity_type_name[parseInt(entity_type,10)-1]}]&nbsp;&nbsp;</b></span>`;
      }
      return text_splitted.join('');
    }
  },
  template: `<div class="article_box">
      <p v-html="marked_text" class='annotation_text' @click='click($event)'></p>
    </div>`
});

let app = new Vue({
  el: '#output',
  data: {
    items: sample
  },
});

