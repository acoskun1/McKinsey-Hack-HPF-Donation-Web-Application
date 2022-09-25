from weasyprint import HTML, CSS
import os
import jinja2
from datetime import datetime

class PDFCreator:
    htmldir = os.path.join(os.path.dirname(os.path.abspath(__file__)),'templates')
    cssdir = os.path.join(os.path.dirname(os.path.abspath(__file__)),'statics','styles')
    jinjaEnv = jinja2.Environment(loader=jinja2.FileSystemLoader(searchpath=htmldir))
    def create_invoice(self):
        template = self.jinjaEnv.get_template("invoice.html")
        response = {
            "data":{
                "donorname":"John Smith",
                "project":"example project",
                "task":"example task",
                "ammount":"545",
                "currency":"$",
                "email":"johnsmith@wp.pl",
                "creditcard":"123143243242"
            }
        }
        response["data"]["date"]=datetime.now().strftime("%d %B, %H:%M")
        html_text = template.render(json_data=response["data"])
        html = HTML(string=html_text, base_url="")
        return html.write_pdf(stylesheets=[CSS(os.path.join(self.cssdir,'invoice.css'))])
    def create_timeline(self):
        template = self.jinjaEnv.get_template("timeline.html")
        data = {"events":[
            {"title":"aaa","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.","date":"September 25"},
            {"title":"aab","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.","date":"September 25"}]}
        html_text = template.render(json_data=data)
        html = HTML(string=html_text, base_url="")
        return html.write_pdf(stylesheets=[CSS(os.path.join(self.cssdir,'timeline.css'))])


output = open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'test_output.pdf'), "wb") 
output.write(PDFCreator().create_timeline())
output.close()
