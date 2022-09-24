from weasyprint import HTML, CSS
import os
import jinja2
from datetime import datetime

class PDFCreator:
    templateName = "index.html"
    workdir = os.path.dirname(os.path.abspath(__file__))
    cssfile = os.path.join(os.path.dirname(os.path.abspath(__file__)),'index.css')
    def create(self):
        jinjaEnv = jinja2.Environment(loader=jinja2.FileSystemLoader(searchpath=self.workdir))
        template = jinjaEnv.get_template(self.templateName)
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
        response["data"]["date"]=datetime.now().strftime("%m %B, %H:%M")
        html_text = template.render(json_data=response["data"])
        html = HTML(string=html_text, base_url="")
        return html.write_pdf(stylesheets=[CSS(self.cssfile)])

output = open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'test_output.pdf'), "wb") 
output.write(PDFCreator().create())
output.close()