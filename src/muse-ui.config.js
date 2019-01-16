import 'muse-ui/lib/styles/base.less';
import 'muse-ui/dist/muse-ui.css';
import {
  Avatar,
  AppBar,
  Button,
  Drawer,
  Icon,
  List,
} from 'muse-ui';

const componets = [AppBar, Button, Drawer, Icon, List, Avatar]

export default {
  // Vue.use(对象) 方法会调用对象的install方法并且将,Vue构造函数传入install函数内
  install(Vue) {
    componets.forEach(c => Vue.use(c));
  },
};
