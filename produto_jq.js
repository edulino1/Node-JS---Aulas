$(document).ready(function (){
    var produtos = {};
    var cURL = "";
    var methodName = "";
    exibeProdutos();
    $('#btnAdicionar').click(function () {
        produtos.produto = $('#txtProduto').val();
        produtos.descricao = $('#txtDescricao').val();
        produtos.preco = $('#txtPreco').val();
        var produtoId = $('#txtId').val();
        if(produtoId){
            cURL = "http://localhost:3000/api/v1/produto/alterar/"+produtoId;
            methodName = "PUT";
        }else{
            cURL = "http://localhost:3000/api/v1/produto/cadastro";
            methodName = "POST";
        }
        var produtoObj = JSON.stringify(produtos);
        $.ajax({
            url: cURL,
            method: methodName,
            data: produtoObj,
            contentType: 'application/json; charset=utf-8',
            success: function() {
                if(methodName == 'PUT'){
                    alert('Produto alterado com sucesso!!!');
                    exibeProdutos();
                    reset();
                }else{
                    alert('Produto cadastrado com sucesso!!!');
                    exibeProdutos();
                    reset();
                }
            },
            error: function (error) {
                alert('Produto já cadastrado ou Nome em branco?')
                reset();
            }
        })
    })

    $('#btnCancelar').click(function(){
        reset();
    })
})

function exibeProdutos() {
    $.ajax({
        url: "http://localhost:3000/api/v1/produto/todos",
        method: "GET",
        dataType: "json",
        success: function(data) {
            console.log(data)
            var taBody = $('#tblProduto tbody');
            taBody.empty();
            $(data).each(function (index, element) {
                taBody.append('<tr><td>'+element.id+'</td><td>'+element.produto+'</td><td>'+element.descricao+'</td><td>'+element.preco+'</td><td><button class="btn btn-primary" onclick = "alterar('+element.id+')">Alterar</button></td><td><button class="btn btn-danger" onclick = "deleteProd('+element.id+')">Excluir</button></td></tr>');
            })
        },
        error: function (error) {
            alert(error);
        }
    })
}

function deleteProd(id){
    $.ajax({
        url: 'http://localhost:3000/api/v1/produto/apagar/'+id,
        method: 'DELETE',
        success: function () {
            alert('Registro deletado com sucesso!!!');
            exibeProdutos();
            $('#txtProduto').focus();
        },
        error: function (error) {
            alert('Nenhum registro foi apagado!!!')
        }
    })
}

function alterar(id){
    $.ajax({
        url: 'http://localhost:3000/api/v1/produto/edit/'+id,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log(data);
            $('#txtId').val(data[0].id);
            $('#txtProduto').val(data[0].produto);
            $('#txtDescricao').val(data[0].descricao);
            $('#txtPreco').val(data[0].preco);
            $('#txtProduto').focus();
            //exibeProdutos();
        },
        error: function (error) {
            alert('Nenhuma alteração realizada.')
        }
    })
}

function reset(){
    $('#txtProduto').val('');
    $('#txtDescricao').val('');
    $('#txtPreco').val('');
    $('#txtId').val('');
    $('#txtProduto').focus();
}
