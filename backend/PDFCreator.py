from weasyprint import HTML, CSS
import jinja2

class PDFCreator:
    templateName = "index.html"
    def create(self):
        jinjaEnv = jinja2.Environment(loader=jinja2.FileSystemLoader(searchpath="/home/damian/hackathon22mck/"))
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
        html_text = template.render(json_data=response["data"])
        html = HTML(string=html_text, base_url="")
        return html.write_pdf(stylesheets=[CSS('/home/damian/hackathon22mck/index.css')])

output = open("/home/damian/hackathon22mck/test_output.pdf", "wb")    
output.write(PDFCreator().create())
output.close()